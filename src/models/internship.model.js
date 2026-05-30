import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    stipend: {
      type: String,
      default: "Not disclosed",
    },

    duration: {
      type: String,
      default: "3 Months",
    },

    skills: {
      type: [String],
      default: [],
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Remote",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);