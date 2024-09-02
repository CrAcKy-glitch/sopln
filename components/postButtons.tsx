import {
  HeartOutlined,
  RetweetOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import FlipNumbers from "react-flip-numbers";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { set } from "mongoose";

const styles = {
  glow: {
    animation: "glow 1.5s infinite alternate",
  },
};

const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes glow {
      0% {
        text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41,
          0 0 40px #00ff41;
      }
      100% {
        text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41,
          0 0 50px #00ff41;
      }
    }
  `}</style>
);

export default function PostButton({
  id,
  likesDefault: defaultLikes = 0,
  likedByMeDefault,
  comments: defaultComments = 0,
  clipBoard,
  initiateClipBoard,
}: {
  id: any;
  likesDefault: number;
  likedByMeDefault: boolean;
  comments: number;
  clipBoard: string;
  initiateClipBoard: Function;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL as string;
  const [likesCount, setLikesCount] = useState(defaultLikes);
  const [likedByMe, setLikedByMe] = useState(likedByMeDefault);
  const [commentCount, setCommentCount] = useState(defaultComments);

  async function toggleLike() {
    const response = await axios.post("/api/like", { id });
    if (response.data) {
      setLikedByMe(!likedByMe);
      setLikesCount((value) => (likedByMe ? value - 1 : value + 1));
    }
  }

  const renderLikeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      style={likedByMe ? styles.glow : {}}
    >
      <text
        x="52%"
        y="52%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'Courier New', monospace"
        font-size="18"
        fill="none"
        stroke={likedByMe ? "#00FF41" : "#FFFFFF"}
        stroke-width="2"
      >
        {likedByMe ? "1" : "0"}
      </text>
    </svg>
  );

  return (
    <>
      <GlobalStyles />

      <div className="flex justify-around items-center py-2">
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

        <div className="flex items-center space-x-1">
          <Button
            className="p-3 rounded-full bg-transparent border-none text-xl"
            onClick={toggleLike}
          >
            {renderLikeIcon()}
          </Button>
          <span className="text-sm text-twitterLightGray">
            <FlipNumbers
              height={12}
              width={12}
              color={likedByMe ? "#00FF41" : "#AAB8C2"}
              play
              perspective={100}
              numbers={likesCount.toString()}
            />
          </span>
        </div>

        <div>
          <button
            onClick={() => {
              initiateClipBoard(true);
              setTimeout(() => {
                initiateClipBoard(false);
              }, 2000);
            }}
          >
            <CopyToClipboard text={baseUrl + "/" + clipBoard}>
              <ShareAltOutlined className="text-twitterLightGray" />
            </CopyToClipboard>
          </button>
        </div>
      </div>
    </>
  );
}
