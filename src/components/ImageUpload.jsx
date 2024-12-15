// components/ImageUpload.jsx
import React from 'react';
import { Upload } from 'lucide-react';

const ImageUpload = ({ onImageUpload }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          onImageUpload({
            dataUrl: reader.result,
            width: img.width,
            height: img.height
          });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
      <Upload size={20} />
      <span>Upload Image</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  );
};

export default ImageUpload;