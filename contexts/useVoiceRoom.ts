import { useState } from "react";

export default function useVoiceRoom() {
  const [voiceRoomVisible, setVoiceRoomVisible] = useState<boolean>(true);

  return { voiceRoomVisible, setVoiceRoomVisible };
}
