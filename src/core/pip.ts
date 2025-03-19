import html2canvas from 'html2canvas';

export interface PiPOptions {
  element: HTMLElement;
  fps?: number;
  interactive?: boolean;
  onClose?: () => void;
}

export class PiPManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private video: HTMLVideoElement;
  private stream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  private options: PiPOptions;

  constructor(options: PiPOptions) {
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.video = document.createElement('video');
    this.video.style.position = 'fixed';
    this.video.style.width = '1px';
    this.video.style.height = '1px';
    this.video.style.opacity = '0';
    document.body.appendChild(this.video);
  }

  async start(): Promise<void> {
    const rect = this.options.element.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Start capturing frames
    this.captureFrame();

    // Create and set up the stream
    this.stream = this.canvas.captureStream(this.options.fps || 30);
    this.video.srcObject = this.stream;
    await this.video.play();

    // Request PiP
    try {
      await this.video.requestPictureInPicture();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to enter PiP mode:', error);
      this.cleanup();
      throw error;
    }
  }

  private async captureFrame(): Promise<void> {
    const rect = this.options.element.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    try {
      // Capture the element using html2canvas
      const capturedCanvas = await html2canvas(this.options.element, {
        width: rect.width,
        height: rect.height,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        scale: window.devicePixelRatio,
      });

      // Draw the captured canvas onto our streaming canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(capturedCanvas, 0, 0);

      // Request next frame
      this.animationFrameId = requestAnimationFrame(() => this.captureFrame());
    } catch (error) {
      console.error('Failed to capture frame:', error);
      this.cleanup();
      throw error;
    }
  }

  private setupEventListeners(): void {
    this.video.addEventListener('leavepictureinpicture', () => {
      this.cleanup();
      this.options.onClose?.();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const rect = this.options.element.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    });
  }

  private cleanup(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    this.video.remove();
    this.canvas.remove();
  }
}

export async function enterCustomPiP(options: PiPOptions): Promise<void> {
  const manager = new PiPManager(options);
  await manager.start();
} 