# Enable Right Click Everywhere

This is a simple extension for Chrome that allows right click and other actions (copying, highlighting text) on any website.

## What this extension does

- Unlocks the context menu (right click)
- Allows text selection
- Allows content copying
- Disables protection against these actions
- Works on all sites

## How to install

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`.
3. Enable “Developer Mode” (the switch in the upper right corner)
4. Click “Download unzipped extension”
5. Select the folder with the extension files

## Project Structure

```
enable-right-click-extension/
├─── manifest.json - Extension manifest
├──── content.js - Main script
└──── icons/ - Icon folder
    ├─── icon16.png
    ├─── icon48.png
    └─── icon128.png
```

## Note

This extension is intended for personal use. Some sites block right-clicking and copying for security or content protection reasons. Use responsibly and respect the rights of content owners.