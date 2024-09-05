import { useState } from "react";

export function RightLayout({ children }: { children: any }) {
  const [blockDisplay, setBlockDisplay] = useState<boolean>(false);
  return (
    <>
      <div className="py-2 px-1 justify-end flex-row flex max-w-sm h-full ">
        {children}
      </div>
    </>
  );
}
