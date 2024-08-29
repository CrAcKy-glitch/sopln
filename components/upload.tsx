import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FileDrop } from "react-file-drop";

export default function Upload({
  children,
  onUploadFinish,
}: {
  children: any;
  onUploadFinish: Function;
}) {
  const [isFileNear, setIsFileNear] = useState<boolean>(false);
  const [isFileOver, setIsFileOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  async function handleDrop(
    files: FileList | null,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    if (files && files.length <= 1) {
      const file = files[0];
      const data = new FormData();
      data.append("POST", file);
      data.append("type", "POST");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setImage(result.upload.location);
        onUploadFinish(result.upload.location);
      } else {
        console.error("Error uploading image:", result.message);
      }
    }
  }
  return (
    <>
      <div>
        <FileDrop
          onDragOver={() => {
            setIsFileOver(true);
          }}
          onDragLeave={() => {
            setIsFileOver(false);
          }}
          onDrop={(file, event) => {
            setIsFileNear(false);
            setIsFileOver(false);
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
          {isFileOver || isFileNear ? (
            <div className="bg-twitterBlue text-black relative inset-0 flex justify-center items-center ">
              Drop your files here
            </div>
          ) : (
            <div></div>
          )}
          {children}
          {image.length ? (
            <Image src={image} width={250} height={250} alt="image" />
          ) : (
            ""
          )}
        </FileDrop>
      </div>
    </>
  );
}
