import { neon } from '@neondatabase/serverless';
import { timingSafeEqual } from 'node:crypto';

const sql = neon(process.env.DATABASE_URL);
let ready;
const init = () => (ready ??= sql`
  CREATE TABLE IF NOT EXISTS problems (
    id text PRIMARY KEY,
    data jsonb NOT NULL,
    updated_at bigint NOT NULL DEFAULT 0
  )`);

function authorized(req) {
  const pw = process.env.APP_PASSWORD || '';
  const got = String(req.headers['x-password'] || '');
  if (!pw) return false;
  const a = Buffer.from(got), b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function upsert(item) {
  if (!item || typeof item.id !== 'string' || !item.id) return;
  const { id, ...data } = item;
  await sql`
    INSERT INTO problems (id, data, updated_at)
    VALUES (${id}, ${JSON.stringify(data)}::jsonb, ${Number(data.updated) || Date.now()})
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`;
}

export default async function handler(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await init();
    if (req.method === 'GET') {
      const rows = await sql`SELECT id, data FROM problems ORDER BY updated_at DESC`;
      return res.status(200).json(rows.map(r => ({ ...r.data, id: r.id })));
    }
    if (req.method === 'PUT') {
      const body = req.body;
      for (const item of Array.isArray(body) ? body : [body]) await upsert(item);
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'DELETE') {
      const id = String(req.query.id || '');
      if (!id) return res.status(400).json({ error: 'id required' });
      await sql`DELETE FROM problems WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }
    res.setHeader('Allow', 'GET, PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
