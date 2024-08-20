import useUserInfo from "@app/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./avatar";

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
  const [text, setText] = useState<any>("");

  if (status === "loading") {
    return "loading..";
  }
  async function handlePostSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reply) {
      await axios.post("/api/posts", { text });
    } else {
      await axios.post("/api/posts", { reply, text });
    }
    setText("");
    onPost();
  }

  return (
    <>
      <form
        onSubmit={handlePostSumbit}
        className="border-b-twitterBorder border-b-2 w-full py-2 px-2"
      >
        <div className="flex space-x-1">
          <div className="">
            <Avatar
              image={userInfo?.image}
              alt={userInfo?.name}
              username={userInfo?.username}
            />
          </div>
          <div className="grow m-0 p-0">
            {compact === "reply" ? (
              <div className="flex items-center space-x-1">
                <textarea
                  name=""
                  id=""
                  className="w-full bg-transparent py-2 px-2"
                  placeholder={placeholder}
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="text-right">
                  <button className="bg-twitterBlue rounded-full px-3 py-2 ">
                    Tweet
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  name=""
                  id=""
                  className="w-full bg-transparent py-2 px-2"
                  placeholder={placeholder}
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="text-right">
                  <button className="bg-twitterBlue rounded-full px-3 py-2 ">
                    Tweet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
