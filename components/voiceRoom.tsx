import { VoiceRoomInterface } from "@app/lib/models/voiceroom";
import Link from "next/link";
import { useState, useEffect } from "react";
import Avatar from "./avatar";
import io from "socket.io-client";
import { Users } from "@app/lib/models/user";

const socket = io(process.env.NEXT_PUBLIC_SOCKET as string);

export default function VoiceRoom({
  _id,
  name,
  about,
  tags,
  moderator,
}: VoiceRoomInterface) {
  const [participants, setParticipants] = useState<Users[]>([]);

  useEffect(() => {
    socket.emit("join-room", _id);

    socket.on("participants-update", (updatedParticipants: Users[]) => {
      setParticipants(updatedParticipants);
    });

    return () => {
      socket.emit("leave-room", _id);
    };
  }, [_id]);

  return (
    <div>
      <Link href={"/voice/" + _id}>
        <div className="border border-twitterLightGray bg-gray-900 text-white rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="bg-twitterBlue text-white px-3 py-1 rounded-full text-sm">
              Live
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            <span className="mr-2">tags:</span>
            {tags &&
              tags.map((tag, key) => (
                <span key={key} className="bg-gray-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-xl">
                {moderator?.image !== null && (
                  <Avatar image={moderator?.image} alt={moderator?.name} />
                )}
              </div>
              <div>
                <p className="font-semibold">Moderator: {moderator?.name}</p>
                <p className="text-gray-400 text-sm">
                  {participants.length} people are speaking
                </p>
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              {participants.length > 0 ? (
                participants.map((participant, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center"
                  >
                    {participant?.image && (
                      <Avatar
                        image={participant.image}
                        alt={participant.name}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400">No participants yet</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
