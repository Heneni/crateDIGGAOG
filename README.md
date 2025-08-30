# CrateDIGGAOG - Chrome Extension

A 3D vinyl record crate visualization Chrome extension built with Three.js. Browse your music collection in an immersive 3D environment right from your browser toolbar.

## Features

- 3D vinyl record visualization using Three.js
- Interactive popup interface (400x300px)
- Hover effects and animations
- Loads record data from CSV database
- No build process required - works directly as a Chrome extension
- Fully self-contained with bundled libraries

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `crateDIGGAOG` folder
5. The extension icon will appear in your toolbar

## Usage

- Click the CrateDIGGAOG icon in your Chrome toolbar
- A popup will open showing your 3D vinyl crate collection
- Hover over records to see album information
- Records rotate gently and scale on hover for interaction

## Customizing Your Collection

Edit `cratediggerDB.csv` to customize your vinyl collection:
- `title`: Album name
- `artist`: Artist name  
- `cover`: Album cover URL (optional)
- `year`: Release year

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension format)
- **Popup Dimensions**: 400x300 pixels
- **Libraries**: Three.js (3D graphics), Papa Parse (CSV parsing)
- **No Build Required**: All dependencies bundled locally

## File Structure

```
crateDIGGAOG/
├── manifest.json          # Extension manifest
├── popup.html             # Popup interface
├── popup.js               # Main 3D visualization logic
├── popup.css              # Popup styling
├── cratediggerDB.csv      # Music database
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── lib/                   # Bundled libraries
    ├── three.min.js
    └── papaparse.min.js
```

## Credits

Modernized fork of the original [risq/cratedigger.js](https://github.com/risq/cratedigger.js) converted to a Chrome extension.
