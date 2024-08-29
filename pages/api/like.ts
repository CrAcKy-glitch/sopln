import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Like from "@app/lib/models/like";
import Post from "@app/lib/models/post";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.body;
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const existingLike = await Like.findOne({ author: userId, post: id });

  if (existingLike) {
    const deletion = await Like.deleteOne({ author: userId, post: id });
    if (deletion)
      await Post.updateOne({ _id: id }, { $inc: { likesCount: -1 } });

    return res.json({ message: "Like removed", likesCount: -1 });
  } else {
    const creation = await Like.create({ author: userId, post: id });
    if (creation) {
      await Post.updateOne(
        { _id: id },
        {
          $inc: { likesCount: +1 },
        }
      );
    }

    return res.json({ message: "Post liked", likesCount: 1 });
  }
}
