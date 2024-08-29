import useUserInfo from "@app/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./avatar";
import Upload from "./upload";

export function PostForm({
  onPost,
  placeholder,
  compact,
  reply,
}: {
  reply?: object;
  onPost: any;
  placeholder: string;
  compact?: string;
}) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  if (status === "loading") {
    return "loading..";
  }
  async function handlePostSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { text, image, ...(reply && { reply }) };
    await axios.post("/api/posts", payload);
    setText("");
    setImage("");
    onPost();
  }
  function getImage(imageUrl: string) {
    setImage(imageUrl);
  }

  return (
    <form onSubmit={handlePostSubmit} className="w-full py-2 px-2">
      <div className="flex space-x-1">
        <div>
          <Avatar
            image={userInfo?.image}
            alt={userInfo?.name}
            username={userInfo?.username}
          />
        </div>
        <div className="grow m-0 p-0">
          <Upload onUploadFinish={getImage}>
            <div className={`flex items-center space-x-1`}>
              <textarea
                className="w-full bg-transparent py-2 px-2"
                placeholder={placeholder}
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-twitterBlue rounded-full px-3 py-2"
                >
                  Shoot
                </button>
              </div>
            </div>
          </Upload>
        </div>
      </div>
    </form>
  );
}
