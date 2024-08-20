import useUserInfo from "@app/hooks/useUserInfo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AvatarInterface {
  image: any;
  alt: any;
  className?: string;
  width?: number;
  height?: number;
  username?: string;
  profile?: boolean;
}

export default function Avatar({
  image,
  alt,
  width,
  height,
  className,
  username,
  profile,
}: AvatarInterface) {
  const [pImage, setImage] = useState("loading");
  const { userInfo } = useUserInfo();
  useEffect(() => {
    if (image != "undefined") {
      setImage(image);
    }
  }, [image]);

  async function handleDrop(
    files: FileList | null,
    event: React.DragEvent<HTMLDivElement>
  ) {}

  return (
    <>
      <Link href={`${!profile ? `/profile/${username}` : "/image"}`}>
        {pImage != "loading" ? (
          <Image
            src={pImage}
            alt={alt}
            className={className || "rounded-full"}
            width={width || 40}
            height={height || 40}
          />
        ) : (
          <></>
        )}
      </Link>
    </>
  );
}
