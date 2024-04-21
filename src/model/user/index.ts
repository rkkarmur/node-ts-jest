import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
let dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  role_id: {
    required: true,
    type: Object,
  },
  password: {
    required: true,
    type: String,
  },
  remember_token: {
    // required: true,
    type: String,
  },
  image:{
    type: Object,
  },
  status: {
    required: true,
    type: Number,
    default:1
  },
  created_at: { type: Date, required: true, default: new Date().toISOString() },
  update_at: { type: Date, required: true, default: new Date().toISOString() },
});
// Hash the password before saving or updating the user document
dataSchema.pre("save", async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Set the hashed password in the user document
    this.password = hashedPassword;
    next();
  } catch (error:any) {
    next(error);
  }
});


export const user_model = mongoose.models.user || mongoose.model("user", dataSchema);

