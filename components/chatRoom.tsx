import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar, Tooltip } from "antd";
import { CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import io from "socket.io-client";

const { Title, Text } = Typography;

let socket: any;

interface VoiceChatRoomProps {
  roomName: string;
  userName: string;
  onLeave: () => void;
}

const VoiceChatRoom: React.FC<VoiceChatRoomProps> = ({
  roomName,
  userName,
  onLeave,
}) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const sourceNodeRef = React.useRef<MediaStreamAudioSourceNode | null>(null);
  const bufferRef = React.useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET as string);

    socket.emit("join-room", roomName, userName);

    socket.on("participants-update", (updatedParticipants: string[]) => {
      setParticipants(updatedParticipants);
    });

    socket.on("receive-voice", (voiceData: ArrayBuffer) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const audioBlob = new Blob([voiceData], { type: "audio/webm" });
      const audioURL = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioURL);

      audioElement.addEventListener("canplaythrough", () => {
        audioElement
          .play()
          .catch((error) => console.error("Audio playback error:", error));
      });

      // Clean up the object URL after playback
      audioElement.onended = () => {
        URL.revokeObjectURL(audioURL);
      };
    });

    return () => {
      socket.emit("leave-room", roomName, userName);
      socket.disconnect();
    };
  }, [roomName, userName]);

  const handleStartSpeaking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("voice-data", roomName, event.data);
        }
      };

      mediaRecorder.start(100); // Adjust the interval as needed
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleRemoveParticipant = (participant: string) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p !== participant)
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white font-semibold">
          {roomName}
        </Title>
        <Button
          type="text"
          icon={<CloseOutlined className="text-white text-2xl" />}
          onClick={onLeave}
          className="text-white"
        />
      </div>

      <div className="flex-grow overflow-y-auto mb-6">
        {participants.length > 0 ? (
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-800 rounded-lg shadow-lg"
              >
                <Avatar size={50} className="bg-blue-500 text-white font-bold">
                  {participant[0]}
                </Avatar>
                <div className="ml-4 flex-1">
                  <Text className="text-lg font-medium">{participant}</Text>
                </div>
                <Tooltip title="Start speaking">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PhoneOutlined />}
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleStartSpeaking}
                  />
                </Tooltip>
                <Button
                  type="text"
                  className="text-red-500 ml-4"
                  onClick={() => handleRemoveParticipant(participant)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Text className="text-gray-500 text-center">No participants yet</Text>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="large"
          onClick={handleStartSpeaking}
        >
          Start Speaking
        </Button>
      </div>
    </div>
  );
};

export default VoiceChatRoom;
