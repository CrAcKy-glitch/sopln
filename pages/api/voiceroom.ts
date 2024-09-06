import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import VoiceRoom from "@app/lib/models/voiceroom";
import User from "@app/lib/models/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const { name, about, tags } = req.body;

    if (name && about && tags) {
      const moderator = await User.findById(session?.user.id);
      const status = true;
      await VoiceRoom.create({ name, about, tags, status, moderator });
      return res.json("created");
    }
  }
  if (req.method === "GET") {
    const { id } = req.body;
    if (id) {
      const response = await VoiceRoom.findById(id);
      return res.json(response);
    }

    const response = await VoiceRoom.find({ status: true });
    return res.json(response);
  }
  if (req.method === "PUT") {
    const { roomId, userId } = req.body;

    if (roomId && userId) {
      const voiceRoom = await VoiceRoom.findById(roomId);

      if (voiceRoom) {
        voiceRoom.participants.push(userId);
        await voiceRoom.save();
        return res.json(voiceRoom);
      } else {
        return res.status(404).json({ message: "Room not found" });
      }
    }
  }
}
