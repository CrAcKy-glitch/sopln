import React, { useEffect, useState } from "react";
import TextMode from "@app/components/textMode";
import Image from "next/image";
import VoiceMode from "@app/components/voiceMode";

export function Home() {
  const [showTextPosts, setShowTextPosts] = useState<boolean>(true);
  const [showVoiceRoom, setShowVoiceRoom] = useState<boolean>(false);

  function toggleSelect() {
    if (showTextPosts) {
      setShowVoiceRoom(true);
      setShowTextPosts(false);
      return;
    } else {
      setShowTextPosts(!showTextPosts);
      setShowVoiceRoom(!showVoiceRoom);
      return;
    }
  }
  return (
    <div>
      <div className="m-2">
        <Image
          src={"/sopln.jpeg"}
          alt="logo"
          width={150}
          height={150}
          className="rounded-xl"
        />
      </div>
      <div className="flex-row flex space-x-3 justify-center">
        <button
          className={showTextPosts ? `rounded bg-twitterLightGray w-10` : ""}
          onClick={toggleSelect}
        >
          Text
        </button>
        <button
          className={showVoiceRoom ? `rounded bg-twitterLightGray w-20` : ""}
          onClick={toggleSelect}
        >
          Voice Area
        </button>
      </div>
      {showTextPosts ? <TextMode /> : <VoiceMode />}{" "}
    </div>
  );
}

export default Home;
