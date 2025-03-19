import { enterCustomPiP } from '../core/pip';

let isSelecting = false;
let selectedElement: HTMLElement | null = null;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'startSelection') {
    startElementSelection();
  }
});

function startElementSelection(): void {
  isSelecting = true;
  document.body.style.cursor = 'crosshair';

  // Add hover effect to elements
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('click', handleClick);
}

function handleMouseOver(e: MouseEvent): void {
  if (!isSelecting) return;
  
  const target = e.target as HTMLElement;
  if (target !== selectedElement) {
    if (selectedElement) {
      selectedElement.style.outline = '';
    }
    selectedElement = target;
    selectedElement.style.outline = '2px solid #007bff';
  }
}

function handleMouseOut(e: MouseEvent): void {
  if (!isSelecting) return;
  
  const target = e.target as HTMLElement;
  if (target === selectedElement) {
    target.style.outline = '';
    selectedElement = null;
  }
}

async function handleClick(e: MouseEvent): Promise<void> {
  if (!isSelecting) return;
  
  e.preventDefault();
  e.stopPropagation();
  
  const target = e.target as HTMLElement;
  if (target === selectedElement) {
    try {
      await enterCustomPiP({
        element: target,
        fps: 30,
        onClose: () => {
          cleanup();
        }
      });
    } catch (error) {
      console.error('Failed to enter PiP mode:', error);
      cleanup();
    }
  }
}

function cleanup(): void {
  isSelecting = false;
  document.body.style.cursor = '';
  
  if (selectedElement) {
    selectedElement.style.outline = '';
    selectedElement = null;
  }
  
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mouseout', handleMouseOut);
  document.removeEventListener('click', handleClick);
} 