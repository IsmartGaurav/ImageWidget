// components/BrushControls.jsx
import React from 'react';
import { Palette, Eraser } from 'lucide-react';

const BrushControls = ({ 
  brushSize, 
  onBrushSizeChange, 
  isErasing, 
  onEraserToggle, 
  onClearCanvas 
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <Palette size={20} className="text-gray-600" />
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-gray-600 text-sm w-8">{brushSize}px</span>
          </div>
        </div>
      </div>

      <button
        onClick={onEraserToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isErasing
            ? 'bg-purple-600 text-white'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Eraser size={20} />
        <span>Eraser</span>
      </button>

      <button
        onClick={onClearCanvas}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default BrushControls;