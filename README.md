# PiP Anything

A browser extension that allows you to turn any element on a webpage into a Picture-in-Picture window. Perfect for keeping important elements like chess boards, chat windows, or live updates visible while browsing other content.

![PiP Anything Demo](docs/demo.gif)

## Features

- 🎯 Select any element on a webpage to display in PiP mode
- 🔄 Real-time updates of the selected element
- 🎨 Works with dynamic content and interactive elements
- 🌐 Cross-browser support (Chrome, Firefox, Edge)
- 🎮 Simple and intuitive interface
- ⚡ Lightweight and performant

## Use Cases

- Chess games on lichess.org
- Live chat windows
- Stock tickers and financial data
- Video players (as an alternative to native PiP)
- Live sports scores
- Social media feeds
- Any other element you want to keep visible

## Installation

### Development Installation

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
   - **Chrome/Edge:**
     1. Open `chrome://extensions/`
     2. Enable "Developer mode" in the top right
     3. Click "Load unpacked"
     4. Select the `dist` directory from this project
   - **Firefox:**
     1. Open `about:debugging#/runtime/this-firefox`
     2. Click "Load Temporary Add-on"
     3. Select any file from the `dist` directory

### Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon. Stay tuned!

## Usage

1. Click the PiP Anything icon in your browser toolbar
2. Click the "Select Element" button in the popup
3. Hover over any element on the webpage to highlight it
4. Click the highlighted element to display it in PiP mode
5. The element will now appear in a floating window that stays on top of other windows
6. To close the PiP window, click the close button or press Escape

## Development

### Available Scripts

- `npm run build` - Build the extension for production
- `npm run watch` - Watch for changes and rebuild automatically
- `npm test` - Run tests
- `npm run lint` - Lint the code
- `npm run format` - Format the code

### Project Structure

```
src/
├── extension/           # Extension source files
│   ├── icons/          # Extension icons
│   ├── popup.tsx       # Popup UI
│   ├── content.ts      # Content script
│   ├── background.ts   # Background script
│   └── manifest.json   # Extension manifest
└── test/               # Test files
```

### Technical Details

The extension uses modern web technologies:
- HTML5 Canvas for element capture
- MediaStream API for video streaming
- Picture-in-Picture API for window management
- React for the popup UI
- TypeScript for type safety
- Webpack for bundling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the native Picture-in-Picture API
- Built with React and TypeScript
- Uses the Chrome Extension Manifest V3
