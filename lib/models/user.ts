import { model, models, Schema } from "mongoose";

export interface Users {
  _id: string;
  name: string;
  email: string;
  image: string;
  username: string;
  bio: string;
  cover: string;
  location: string;
}

const UserDesign = {
  name: String,
  email: String,
  image: String,
  username: String,
  bio: String,
  cover: String,
  location: String,
};

const UserSchema = new Schema(UserDesign, { timestamps: true });

const User = models?.User || model("User", UserSchema);

export default User;
