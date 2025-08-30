# crateDIGGAOG

Private and modernized fork of the original [risq/cratedigger.js](https://github.com/risq/cratedigger.js).

## Features

- 3D crate digger visualization using Three.js
- Loads record data from a CSV file (`public/cratediggerDB.csv`)
- Ready to deploy on [Vercel](https://vercel.com/)
- Fully modifiable and private to you

## Local Development

1. Install Node.js (version 18+ recommended)
2. Run:
   ```
   npm install
   npm run dev
   ```
   Then open [http://localhost:5173](http://localhost:5173)

## Deploying to Vercel

1. Go to [https://vercel.com/import/git](https://vercel.com/import/git)
2. Connect your GitHub account, select your `crateDIGGAOG` repo
3. Accept defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**

Your app will be live on a Vercel URL (e.g., `https://crateDIGGAOG.vercel.app`).

## Editing your data

- Edit `public/cratediggerDB.csv` and commit changes to update your records.

## Need Help?

If you have any questions or want to add features, open an issue or ask Copilot for step-by-step help.