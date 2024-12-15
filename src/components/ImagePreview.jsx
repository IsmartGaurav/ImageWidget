// components/ImagePreview.jsx
import React from 'react';

const ImagePreview = ({ originalImage, maskImage }) => {
  if (!originalImage && !maskImage) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {originalImage && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">Original Image</h4>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={originalImage.dataUrl}
                alt="Original"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        
        {maskImage && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">Mask Image</h4>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={maskImage}
                alt="Mask"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;