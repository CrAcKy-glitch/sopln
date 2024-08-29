import Post from "@app/lib/models/post";
import { initMongoose } from "@app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Like from "@app/lib/models/like";
import User from "@app/lib/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (req.method == "GET") {
    const { parent } = req.query;

    if (parent) {
      const replies = await Post.find({ parent })
        .sort({ createdAt: -1 })
        .exec();
      return res.json({ replies, likes: [true] });
    }
    const { id } = req.query;
    if (id) {
      const post = await Post.findById(id).populate("author");

      const likes = await Like.findOne({
        post: id,
        "author.id": user?.username,
      })
        .populate("post")
        .exec();
      return res.json({ post, like: [true], likes });
    }

    const { author } = req.query;

    if (author) {
      const posts = await Post.find({ "author.username": author })
        .sort({ createdAt: -1 })
        .exec();
      const findLike = await Like.find({
        author: user?.id,
      })
        .populate("post")
        .exec();
      return res.json({ posts, findLike });
    }

    const allPosts = await Post.find({ parent: null })
      .populate("author")
      .sort({ createdAt: -1 })
      .exec();

    const findLike = await Like.find({
      author: user?.id,
    })
      .populate("post")
      .exec();
    return res.json({ allPosts, findLike });
  }
  if (req.method == "POST") {
    const defaultLikesCount = 0,
      defaultCommentsCount = 0;
    const { reply, text, image } = req.body;
    if (reply) {
      const result = await Post.create({
        author: user,
        parent: reply.parent,
        image: reply.image,
        username: user?.username,
        likesCount: defaultLikesCount,
        commentsCount: defaultCommentsCount,
        text,
      });
      const update = await Post.updateOne(
        { _id: reply.parent },
        {
          $inc: { commentsCount: +1 },
        }
      );
      return res.json({ result });
    }

    const username = await User.findById(user?.id).populate("username");

    const result = await Post.create({
      author: user,
      "author.username": username?.username,
      text,
      image,
      commentsCount: defaultCommentsCount,
      likesCount: defaultLikesCount,
    });
    return res.json({ result, text, username });
  }

  return res.json("unsupported request");
}
