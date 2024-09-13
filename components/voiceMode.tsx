import React, { useEffect, useState } from "react";
import VoiceLayout from "./voiceLayout";
import axios from "axios";
import { VoiceRoomInterface } from "@app/lib/models/voiceroom";
import VoiceRoom from "./voiceRoom";
import VoiceRoomForm from "./createVoiceRoomForm";
import useVoiceRoom from "@app/contexts/useVoiceRoom";

export default function VoiceMode() {
  const [voiceRoomData, setVoiceRoomData] = useState<
    VoiceRoomInterface[] | null
  >(null);

  const { voiceRoomVisible, setVoiceRoomVisible } = useVoiceRoom();
  async function fetchVoiceRooms() {
    try {
      const response = await axios.get("/api/voiceroom");
      setVoiceRoomData(response.data);
    } catch (error) {
      console.error("Error fetching voice rooms:", error);
    }
  }

  function createVoiceRoom() {
    setVoiceRoomVisible(false);
  }

  useEffect(() => {
    fetchVoiceRooms();
  }, []);

  return (
    <VoiceLayout>
      {!voiceRoomVisible ? (
        <VoiceRoomForm />
      ) : (
        <>
          {voiceRoomData ? (
            voiceRoomData.map((voiceRoom, key) => (
              <div key={key}>
                <VoiceRoom
                  _id={voiceRoom._id}
                  name={voiceRoom.name}
                  about={voiceRoom.about}
                  tags={voiceRoom.tags}
                  moderator={voiceRoom.moderator}
                />
              </div>
            ))
          ) : (
            <div className="text-white">Nothing to Display</div>
          )}
          <div className="fixed bottom-10 right-10 text-white rounded-lg transition-opacity duration-500">
            <button
              className="bg-twitterBlue rounded p-3"
              onClick={createVoiceRoom}
            >
              Create Room
            </button>
          </div>
        </>
      )}
    </VoiceLayout>
  );
}
