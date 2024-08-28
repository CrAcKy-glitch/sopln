import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@app/lib/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const { bio, name } = req.body;

  await User.findByIdAndUpdate(session?.user.id, { bio, name });

  res.json("ok");
}
