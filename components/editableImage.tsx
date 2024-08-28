import Image from "next/image";
import { useState } from "react";
import Loader from "./loading";
import { FileDrop } from "react-file-drop";

type type = "AVATAR" | "COVER";
interface EditableImageInterface {
  backgroundImageSrc: string;
  className?: string;
  owner?: boolean;
  imageClassName: string;
  dragPrompt?: boolean;
  nextImageHeight: number;
  nextImageWidth: number;
  onChange: Function;
  type: type;
}

export default function EditableImage({
  backgroundImageSrc,
  className,
  dragPrompt,
  imageClassName,
  nextImageHeight,
  nextImageWidth,
  onChange,
  owner,
  type,
}: EditableImageInterface) {
  const [isFileNear, setIsFileNear] = useState<boolean>(false);
  const [isFileOver, setIsFileOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  async function handleDrop(
    files: FileList | null,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    if (files && files.length <= 1) {
      const file = files[0];
      const data = new FormData();
      data.append("cover", file);
      if (type === "COVER") {
        await fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (!response.ok) {
            return <div>there was an error uploading this file</div>;
          } else {
            onChange();
          }
        });
      }

      if (type === "AVATAR") {
        console.log("AIR BENDER");
      }
      setIsUploading(false);
    }
  }

  return (
    <>
      <div className={`${className}`}>
        {owner ? (
          <FileDrop
            onDragOver={() => {
              setIsFileOver(true);
            }}
            onDragLeave={() => {
              setIsFileOver(false);
            }}
            onDrop={(file, event) => {
              setIsFileNear(false);
              setIsUploading(true);
              handleDrop(file, event);
            }}
            onFrameDragEnter={() => {
              setIsFileNear(true);
            }}
            onFrameDragLeave={() => {
              setIsFileNear(false);
            }}
          >
            {isFileNear && dragPrompt ? (
              <div className="absolute items-center justify-center flex border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer z-10">
                <p className="text-gray-500">
                  Drag & drop files here, or click to select files
                </p>
              </div>
            ) : (
              ""
            )}
            {backgroundImageSrc != "undefined" ? (
              <div className={className}>
                {isUploading ? (
                  <div
                    className={
                      "absolute flex items-center justify-center bg-twitterBlue max-w-xl max-h-40 opacity-50 " +
                      className
                    }
                  >
                    <Loader />
                  </div>
                ) : (
                  ""
                )}
                <Image
                  src={backgroundImageSrc}
                  alt={"background"}
                  width={nextImageWidth}
                  height={nextImageHeight}
                  className={`${imageClassName}`}
                ></Image>
              </div>
            ) : (
              <div className="h-40 bg-twitterLightGray"></div>
            )}
          </FileDrop>
        ) : (
          <div>
            {backgroundImageSrc != "undefined" ? (
              <div>
                <Image
                  src={backgroundImageSrc}
                  alt={"background"}
                  width={nextImageWidth}
                  height={nextImageHeight}
                  className={`${imageClassName} `}
                ></Image>
              </div>
            ) : (
              <div className="h-40 bg-twitterLightGray"></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
