import React from 'react';

/**
 * Forwards pointer and mouse events directly to the underlying Spline WebGL canvas
 * so that 3D hover and rotation interactions execute simultaneously with text hover animations.
 */
export const forwardToCanvas = (e: React.PointerEvent | React.MouseEvent) => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;

  try {
    // 1. Dispatch PointerEvent
    const pointerEvt = new PointerEvent(e.type.startsWith('pointer') ? e.type : 'pointermove', {
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      movementX: (e as any).movementX || 0,
      movementY: (e as any).movementY || 0,
      bubbles: true,
      cancelable: true,
      pointerId: (e as any).pointerId || 1,
      pointerType: (e as any).pointerType || 'mouse',
      isPrimary: true,
    });
    canvas.dispatchEvent(pointerEvt);

    // 2. Dispatch MouseEvent for Spline runtimes listening specifically to mousemove
    const mouseEvt = new MouseEvent('mousemove', {
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      movementX: (e as any).movementX || 0,
      movementY: (e as any).movementY || 0,
      bubbles: true,
      cancelable: true,
    });
    canvas.dispatchEvent(mouseEvt);
  } catch {
    // Graceful fallback
  }
};

