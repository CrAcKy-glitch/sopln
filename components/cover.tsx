import Image from "next/image";
import Loading from "@app/components/loading";
import { ReactEventHandler, useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";
import Loader from "@app/components/loading";

export default function Cover({
  backgroundImageSrc,
  handler,
  onUpload,
}: {
  backgroundImageSrc: string;
  handler?: string;
  onUpload?: Function;
}) {
  const [isFileNear, setIsFileNear] = useState<boolean>(false);
  const [isFileOver, setIsFileOver] = useState<boolean>(false);
  const [uploading, isUploading] = useState<boolean>(false);

  const handleDrop = (
    files: FileList | null,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    if (files && files.length > 0) {
      const file = files[0];
      const data = new FormData();
      data.append("cover", file);

      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (!response.ok) {
          return <div>there was an error uploading this file</div>;
        } else {
          setIsFileNear(false);
          if (onUpload) onUpload();
        }
      });
    }
    return (
      <>
        <Loader />
      </>
    );
  };

  return (
    <>
      {handler == "owner" ? (
        <FileDrop
          onDragOver={() => {
            setIsFileOver(true);
          }}
          onDragLeave={() => {
            setIsFileOver(false);
          }}
          onDrop={handleDrop}
          onFrameDragEnter={() => {
            setIsFileNear(true);
          }}
          onFrameDragLeave={() => {
            setIsFileNear(false);
          }}
        >
          <div
            className={`h-40 ${
              isFileNear ? " bg-white w-full" : "bg-twitterLightGray"
            }`}
          >
            {isFileNear ? (
              <div className="absolute border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer z-10">
                <p className="text-gray-500">
                  Drag & drop files here, or click to select files
                  {isFileOver ? "true" : "false"}
                </p>
              </div>
            ) : (
              ""
            )}
            {backgroundImageSrc != "undefined" ? (
              <div>
                <Image
                  src={backgroundImageSrc}
                  alt={"background"}
                  width={600}
                  height={100}
                  className="h-40 w-full"
                ></Image>
              </div>
            ) : (
              <div>Upload an image here</div>
            )}
          </div>
        </FileDrop>
      ) : (
        <div>
          {backgroundImageSrc != "undefined" ? (
            <div>
              <Image
                src={backgroundImageSrc}
                alt={"background"}
                width={600}
                height={100}
                className="h-40 w-full"
              ></Image>
            </div>
          ) : (
            <div className="h-40 bg-twitterLightGray"></div>
          )}
        </div>
      )}
    </>
  );
}
