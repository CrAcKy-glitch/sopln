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

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const existingLike = await Like.findOne({ author: userId, post: id });

  if (existingLike) {
    if (post.likesCount > 0) {
      const deletion = await Like.deleteOne({ author: userId, post: id });
      if (deletion) {
        await Post.updateOne({ _id: id }, { $inc: { likesCount: -1 } });
      }
      return res.json({
        message: "Like removed",
        likesCount: post.likesCount - 1,
      });
    } else {
      return res.json({
        message: "Cannot reduce likes below 0",
        likesCount: post.likesCount,
      });
    }
  } else {
    const creation = await Like.create({ author: userId, post: id });
    if (creation) {
      await Post.updateOne({ _id: id }, { $inc: { likesCount: +1 } });
    }
    return res.json({ message: "Post liked", likesCount: post.likesCount + 1 });
  }
}
