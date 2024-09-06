import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar, Tooltip } from "antd";
import { CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure Ant Design styles are imported

const { Title, Text } = Typography;

interface VoiceChatRoomProps {
  roomName: string;
  onLeave: () => void;
}

const VoiceChatRoom: React.FC<VoiceChatRoomProps> = ({ roomName, onLeave }) => {
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    // Simulate participants joining and leaving
    const simulateParticipants = () => {
      // Example participants
      setParticipants(["Alice", "Bob", "Charlie"]);

      // Simulate participant updates every 5 seconds
      const intervalId = setInterval(() => {
        setParticipants((prevParticipants) => {
          const newParticipant = `User${Math.floor(Math.random() * 100)}`;
          return [...prevParticipants, newParticipant].slice(0, 5); // Limit to 5 participants for demo
        });
      }, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    };

    simulateParticipants();
  }, []);

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
        >
          Start Speaking
        </Button>
      </div>
    </div>
  );
};

export default VoiceChatRoom;
