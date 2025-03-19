import { enterCustomPiP } from '../pip';

describe('PiP Functionality', () => {
  let mockElement: HTMLElement;
  let mockVideo: HTMLVideoElement;
  let mockCanvas: HTMLCanvasElement;
  let mockContext: CanvasRenderingContext2D;
  let mockStream: MediaStream;

  beforeEach(() => {
    // Mock HTML elements
    mockElement = document.createElement('div');
    mockVideo = document.createElement('video');
    mockCanvas = document.createElement('canvas');
    mockContext = mockCanvas.getContext('2d')!;
    mockStream = new MediaStream();

    // Mock document methods
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.createElement = jest.fn((tagName) => {
      switch (tagName) {
        case 'video':
          return mockVideo;
        case 'canvas':
          return mockCanvas;
        default:
          return document.createElement(tagName);
      }
    });

    // Mock canvas methods
    mockCanvas.getContext = jest.fn().mockReturnValue(mockContext);
    mockCanvas.captureStream = jest.fn().mockReturnValue(mockStream);

    // Mock video methods
    mockVideo.play = jest.fn().mockResolvedValue(undefined);
    mockVideo.requestPictureInPicture = jest.fn().mockResolvedValue(undefined);

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn().mockReturnValue(1);
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create necessary elements when starting PiP', async () => {
    await enterCustomPiP({ element: mockElement });

    expect(document.createElement).toHaveBeenCalledWith('video');
    expect(document.createElement).toHaveBeenCalledWith('canvas');
    expect(document.body.appendChild).toHaveBeenCalledWith(mockVideo);
  });

  it('should set up video element correctly', async () => {
    await enterCustomPiP({ element: mockElement });

    expect(mockVideo.style.position).toBe('fixed');
    expect(mockVideo.style.width).toBe('1px');
    expect(mockVideo.style.height).toBe('1px');
    expect(mockVideo.style.opacity).toBe('0');
  });

  it('should handle cleanup when PiP is closed', async () => {
    const onClose = jest.fn();
    await enterCustomPiP({ element: mockElement, onClose });

    // Simulate PiP window closing
    mockVideo.dispatchEvent(new Event('leavepictureinpicture'));

    expect(document.body.removeChild).toHaveBeenCalledWith(mockVideo);
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
}); 