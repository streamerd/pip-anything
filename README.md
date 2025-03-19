# PiP Anything

A browser extension that allows you to turn any element on a webpage into a Picture-in-Picture window.

## Features

- Select any element on a webpage to display in PiP mode
- Real-time updates of the selected element
- Works with dynamic content
- Cross-browser support (Chrome, Firefox, Edge)
- Simple and intuitive interface

## Installation

1. Clone the repository:
```bash
git clone https://github.com/streamerd/pip-anything.git
cd pip-anything
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in your browser:
   - Open Chrome/Edge and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory
   - For Firefox, go to `about:debugging` and load the extension from the `dist` directory

## Development

- Watch mode: `npm run watch`
- Run tests: `npm test`
- Lint code: `npm run lint`
- Format code: `npm run format`

## Usage

1. Click the extension icon in your browser toolbar
2. Click "Select Element" in the popup
3. Hover over any element on the webpage to highlight it
4. Click the element to display it in PiP mode
5. The element will now appear in a floating window that stays on top of other windows

## Technical Details

The extension uses:
- HTML5 Canvas for element capture
- MediaStream API for video streaming
- Picture-in-Picture API for window management
- React for the popup UI
- TypeScript for type safety

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
