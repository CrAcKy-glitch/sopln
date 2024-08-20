import {
  HeartOutlined,
  RetweetOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import FlipNumbers from "react-flip-numbers";
export default function PostButton({
  id,
  likesDefault: defaultLikes = 0,
  likedByMeDefault,
  comments: defaultComments = 0,
}: {
  id: any;
  likesDefault: number;
  likedByMeDefault: boolean;
  comments: number;
}) {
  const [likesCount, setLikesCount] = useState(defaultLikes);
  const [likedByMe, setLikedByMe] = useState(likedByMeDefault);
  const [commentCount, setCommentCount] = useState(defaultComments);
  async function toggleLike() {
    const response = await axios.post("/api/like", { id });
    if (response.data) {
      if (!likedByMe) {
        setLikedByMe(true);
        setLikesCount((value) => value + 1);
      } else {
        setLikedByMe(false);
        setLikesCount((value) => value - 1);
      }
    }
  }
  return (
    <div className=" bottom-0 left-0 right-0  py-2">
      <div className="flex justify-around items-center px-4">
        <div className="flex items-center space-x-1">
          <Button className="p-2 rounded-full hover:bg-gray-100 text-xl border-none bg-transparent">
            <CommentOutlined className="text-twitterLightGray" />
          </Button>
          <span className="text-sm text-twitterLightGray">{commentCount}</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button className="p-2 rounded-full hover:bg-gray-100 bg-transparent border-none text-xl">
            <RetweetOutlined className="text-twitterLightGray" />
          </Button>
          <span className="text-sm text-twitterLightGray">0</span>
        </div>

        <div className={`flex items-center space-x-1 `}>
          <Button
            className={`p-2 rounded-full bg-transparent border-none text-xl `}
          >
            <HeartOutlined
              className={` ${
                likedByMe ? "text-red-400" : " text-twitterLightGray"
              }`}
              onClick={toggleLike}
            />
          </Button>
          <span className="text-sm text-twitterLightGray">
            <FlipNumbers
              height={12}
              width={12}
              color={`${likedByMe ? "red" : "gray"}`}
              play
              perspective={100}
              numbers={likesCount.toString()}
            />
          </span>
        </div>

        <div>
          <Link href={"/"} className="p-2 rounded-full hover:bg-gray-100">
            <ShareAltOutlined className="text-twitterLightGray" />
          </Link>
        </div>
      </div>
    </div>
  );
}
