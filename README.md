# crateDIGGAOG - Chrome Extension

Private and modernized fork of the original [risq/cratedigger.js](https://github.com/risq/cratedigger.js), now as a Chrome extension!

## Features

- 3D crate digger visualization using Three.js in a Chrome extension popup
- Loads record data from a CSV file (`cratediggerDB.csv`)
- Works completely offline once installed
- Fully modifiable and private to you

## Installation as Chrome Extension

1. Download or clone this repository
2. Run `npm install && npm run build`
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top right)
5. Click "Load unpacked" and select the `dist/` folder
6. Click the extension icon in your browser toolbar to view your 3D record collection!

## Local Development

1. Install Node.js (version 18+ recommended)
2. Run:
   ```
   npm install
   npm run build
   ```
3. Load the `dist/` folder as an unpacked extension in Chrome

## Editing your data

- Edit `cratediggerDB.csv` and run `npm run build` to update your records in the extension.
- The CSV should have columns: `title`, `artist`, `cover`, `year`

## Build Commands

- `npm run build` - Builds the Chrome extension into the `dist/` folder
- `npm run dev` - Starts Vite development server (for development only)

## Need Help?

If you have any questions or want to add features, open an issue or ask Copilot for step-by-step help.
