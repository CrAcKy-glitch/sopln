import { useState, useEffect } from "react";

export function ClipBoardPopup() {
  return (
    <div
      className={`fixed bottom-10 right-10 p-2 px-4 bg-gray-800 text-white rounded-lg transition-opacity duration-500 `}
      style={{ zIndex: 1000 }}
    >
      Copied to Clipboard!
    </div>
  );
}
