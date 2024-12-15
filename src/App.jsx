import React, { useState, useRef, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import BrushControls from './components/BrushControls';
import Canvas from './components/Canvas';
import ImagePreview from './components/ImagePreview';
import ExportImage from './components/ExportImages';
import axios from 'axios';

const App = () => {
  // State management
  const [imageData, setImageData] = useState(null);
  const [brushSize, setBrushSize] = useState(16);
  const [isErasing, setIsErasing] = useState(false);
  const [maskImage, setMaskImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const canvasRef = useRef(null);

  // Handlers
  const handleImageUpload = (data) => {
    setImageData(data);
    setMaskImage(null); // Reset mask when new image is uploaded
  };

  const handleMaskGenerated = (maskDataUrl) => {
    setMaskImage(maskDataUrl);
  };

  const handleClearCanvas = () => {
    setMaskImage(null);
    // Re-render the canvas with the original image
    const tempImageData = { ...imageData };
    setImageData(null);
    setTimeout(() => setImageData(tempImageData), 0);
  };

  const handleSave = async () => {
    if (!imageData) {
      alert('Please upload an image first.');
      return;
    }

    const canvas = canvasRef.current;
    const originalImageDataUrl = imageData.dataUrl;
    const maskImageDataUrl = canvas.toDataURL('image/png');

    const formData = new FormData();
    formData.append('originalImage', dataURLtoFile(originalImageDataUrl, 'original.png'));
    formData.append('maskImage', dataURLtoFile(maskImageDataUrl, 'mask.png'));

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Images saved successfully');
      fetchImages();
    } catch (error) {
      console.error('Error saving images:', error);
      alert('Error saving images');
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setSavedImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Image Inpainting Widget
          </h1>
          <p className="text-gray-600">
            Upload an image and draw to create a mask
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <ImageUpload onImageUpload={handleImageUpload} />
            <BrushControls
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
              isErasing={isErasing}
              onEraserToggle={() => setIsErasing(!isErasing)}
              onClearCanvas={handleClearCanvas}
            />
            <ExportImage canvasRef={canvasRef} />
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Save
            </button>
          </div>

          {/* Canvas */}
          <Canvas
            ref={canvasRef}
            imageData={imageData}
            brushSize={brushSize}
            isErasing={isErasing}
            onMaskGenerated={handleMaskGenerated}
          />

          {/* Preview */}
          <ImagePreview
            originalImage={imageData}
            maskImage={maskImage}
          />

          {/* Saved Images */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Saved Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedImages.map((image) => (
                <div key={image._id} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600">Mask Image</h4>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:5000/images/${image._id}/mask`}
                      alt="Mask"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
