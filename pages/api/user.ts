import User from "@app/lib/models/user";
import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);

    if (req.method == "GET") {
      const { handle } = req.query;
      if (handle) {
        const user = await User.findOne({ username: handle });
        return res.json({ user });
      }
      const { id } = req.query;

      const user = await User.findById(id);

      return res.json({ user });
    } else if (req.method == "PUT") {
      const { username } = req.body;
      const result = await User.findByIdAndUpdate(session?.user?.id, {
        username,
      });

      return res.json({ session });
    }
  } catch (error) {
    return res.json(error);
  }
}
