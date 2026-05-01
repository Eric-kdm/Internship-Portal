import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["student", "employer"],
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // Student fields
  firstName: String,
  lastName: String,

  // Employer fields
  companyName: String,
  website: String,
});

export default mongoose.model("User", userSchema);