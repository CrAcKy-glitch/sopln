import { model, models, Schema } from "mongoose";
import { Users } from "./user";

export interface VoiceRoomInterface {
  _id?: string;
  name: string;
  about: string;
  tags: Array<string>;
  participants?: Array<string>;
  moderator?: Users;
  moderatorName?: string;
}

const VoiceRoomDesign = {
  name: String,
  participants: Array,
  moderator: String,
  status: Boolean,
  tags: Array,
};

const VoiceRoomSchema = new Schema(VoiceRoomDesign, { timestamps: true });

const VoiceRoom = models?.VoiceRoom || model("VoiceRoom", VoiceRoomSchema);

export default VoiceRoom;
