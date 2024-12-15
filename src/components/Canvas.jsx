// components/Canvas.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const Canvas = forwardRef(({
  imageData,
  brushSize,
  isErasing,
  onMaskGenerated
}, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useImperativeHandle(ref, () => ({
    toDataURL: (type) => canvasRef.current.toDataURL(type),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Enable anti-aliasing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    contextRef.current = context;

    // Set initial canvas state
    if (!imageData) {
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageData]);

  useEffect(() => {
    if (imageData) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height;
        let newWidth = canvas.width;
        let newHeight = canvas.width / aspectRatio;

        if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = canvas.height * aspectRatio;
        }

        // Center the image
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        // Clear and draw
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, newWidth, newHeight);
      };

      img.src = imageData.dataUrl;
    }
  }, [imageData]);

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    const pos = getMousePos(canvasRef.current, nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const pos = getMousePos(canvasRef.current, nativeEvent);
    const context = contextRef.current;

    context.lineTo(pos.x, pos.y);
    context.strokeStyle = isErasing ? 'black' : 'white';
    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);

    // Generate mask
    const maskDataUrl = canvasRef.current.toDataURL('image/png');
    onMaskGenerated(maskDataUrl);
  };

  return (
    <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ touchAction: 'none', cursor: 'crosshair' }}
      />
    </div>
  );
});

export default Canvas;
