import React from "react";

const ExportImage = ({ canvasRef }) => {
  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "mask.png"; 
    link.click();
  };

  return <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors" onClick={exportCanvas}>Export Mask</button>;
};

export default ExportImage;
