import { model, models, Schema } from "mongoose";

export interface followInterface {
  author: Object;
  destination: Object;
}

const follow = {
  author: Object,
  destination: Object,
};

const FollowSchema = new Schema(follow, { timestamps: true });
const Follow = models?.Follow || model("Follow", FollowSchema);
export default Follow;
