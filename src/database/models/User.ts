import { Schema, model } from "mongoose";
import { type UserCredentials } from "../../types";

const userSchema = new Schema<UserCredentials>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "user");

export default User;
