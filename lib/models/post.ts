import { model, models, Schema } from "mongoose";
import { TDate } from "timeago-react";
import { Users } from "./user";
import { likeInterface } from "./like";

export interface PostInterface {
  _id: any;
  author: Users;
  createdAt: TDate;
  text: string;
  findLike: likeInterface;
  likesCount: number;
  commentsCount: number;
  parent?: string;
  image?: string;
}

const PostDesign = {
  author: Object,
  text: String,
  likesCount: Number,
  commentsCount: Number,
  parent: String,
  image: String,
};

const PostSchema = new Schema(PostDesign, { timestamps: true });

const Post = models?.Post || model("Post", PostSchema);
export default Post;
