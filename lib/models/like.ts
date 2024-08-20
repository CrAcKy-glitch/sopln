import { model, models, Schema } from "mongoose";

export interface likeInterface {
  author: string;
  post: string;
  likesCount?: number;
}

const like = {
  author: String,
  post: String,
};

const LikeSchema = new Schema(like, { timestamps: true });

const Like = models?.Like || model("Like", LikeSchema);

export default Like;
