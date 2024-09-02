import React, { useState } from "react";

export function DeveloperNotes() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative p-6 bg-gradient-to-r max-h-60 hidden md:block from-gray-800 via-gray-700 to-gray-600 text-white rounded-lg shadow-lg max-w-md">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="text-xl">
        <h2 className="text-2xl font-bold border-b-2 border-amber-500 pb-2 mb-4">
          Developer Notes
        </h2>
        <p className="lea'ding-relaxed text-base">
          - Create Shoots and Comments
          <br />
          -There are no likes only 1 and 0
          <br />
          - My Crappy Code section in profile coming soon (I hope)
          <br />- Drag and drop images to upload images to your shoots
        </p>
      </div>
    </div>
  );
}
