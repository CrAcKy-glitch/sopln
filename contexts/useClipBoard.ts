import { useState } from "react";

export function useClipBoardPopup() {
  const [clipBoardPopup, setClipBoardPopup] = useState<boolean>(false);

  return { clipBoardPopup, setClipBoardPopup };
}
