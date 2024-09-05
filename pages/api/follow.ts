import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Follow from "@app/lib/models/follow";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const { targetUser, fetch, selfUser } = req.body;

  if (selfUser) {
    const count = await Follow.countDocuments({ destination: selfUser });
    return res.json({ count });
  }

  if (targetUser && !fetch) {
    const existingFollow = await Follow.findOne({
      author: session?.user.id,
      destination: targetUser,
    });
    if (existingFollow) {
      await Follow.deleteOne({
        author: session?.user.id,
        destination: targetUser,
      });
      return res.json("unfollowed");
    }
    await Follow.create({
      author: session?.user.id,
      destination: targetUser,
    });
    return res.json("followed");
  }
  if (targetUser && fetch) {
    const existingFollow = await Follow.findOne({
      author: session?.user.id,
      destination: targetUser,
    });
    if (existingFollow) {
      return res.json(true);
    }
    return res.json(false);
  }
}
