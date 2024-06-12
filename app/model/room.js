import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: String,
    roomAlias: String,
    email: String,
  }, 
  {
    collection: "rooms" 
  }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
