import VoiceChatRoom from "@app/components/chatRoom";
import useUserInfo from "@app/contexts/useUserInfo";
import { VoiceRoomInterface } from "@app/lib/models/voiceroom";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VoiceChat() {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { id } = router.query;
  const [roomData, setRoomData] = useState<VoiceRoomInterface | null>(null);

  const handleLeave = () => {
    router.push("/");
  };

  async function fetchRoomDetails() {
    if (id) {
      try {
        const response = await axios.get("/api/voiceroom", {
          params: { id },
        });
        setRoomData(response.data);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
      }
    }
  }

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  return (
    <>
      {roomData && userInfo?.name && (
        <VoiceChatRoom
          roomName={id}
          userName={userInfo?.name}
          onLeave={handleLeave}
        />
      )}
    </>
  );
}
