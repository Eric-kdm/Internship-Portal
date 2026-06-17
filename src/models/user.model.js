import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    firstName: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    lastName: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    // Employer fields
    companyName: {
      type: String,
      required: function () {
        return this.role === "employer";
      },
    },
    website: String,

    //profile completion tracking
    profileCompleted: {
      type: Boolean,
      default: false,
    },

    //
    avatar: String,
    bio: String,

    // 📄 Resume (Cloudinary URL)
    resumeUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);