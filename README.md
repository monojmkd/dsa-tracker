# DSA Tracker (Vercel + Neon)

## Setup
1. **Neon**: create a project at neon.tech and copy the connection string
   (Dashboard > Connect, looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).
2. **GitHub**: push this folder to a new repo.
3. **Vercel**: Add New > Project > import the repo. No build settings needed.
4. In Vercel > Settings > Environment Variables add:
   - `DATABASE_URL` = your Neon connection string
   - `APP_PASSWORD` = a password you choose
   (If you use Neon's Vercel integration, `DATABASE_URL` is added for you.)
5. Deploy (or redeploy after adding the variables) and open your site. Enter your password when asked.

The table is created automatically on the first request. `schema.sql` is there if you prefer to run it yourself.

## Moving your old data
In the earlier version press **Export**, then in this one press **Import** and pick the JSON file.

## Notes
- The password is saved in your browser; **Lock** forgets it on that device.
- Never put the connection string in index.html. It stays in the Vercel environment variable.
