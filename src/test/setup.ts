// Mock chrome API
global.chrome = {
  runtime: {
    onInstalled: {
      addListener: jest.fn(),
    },
    onMessage: {
      addListener: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
  },
} as any;

// Mock Picture-in-Picture API
const videoElement = document.createElement('video');
if (!videoElement.requestPictureInPicture) {
  videoElement.requestPictureInPicture = jest.fn();
}

// Mock MediaStream API
if (!HTMLCanvasElement.prototype.captureStream) {
  HTMLCanvasElement.prototype.captureStream = jest.fn().mockReturnValue(new MediaStream());
}

// Mock html2canvas
jest.mock('html2canvas', () => {
  return jest.fn().mockResolvedValue(document.createElement('canvas'));
}); 