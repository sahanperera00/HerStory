import mongoose from "mongoose";

const counsellorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  education: [
    {
      university: {
        type: String,
      },
      type: {
        type: String,
      },
      field: {
        type: String,
      },
      graduated: {
        type: Date,
      },
    },
  ],
  experience: [
    {
      employer: {
        type: String,
      },
      title: {
        type: String,
      },
      duration: {
        type: Number,
      },
      decription: {
        type: String,
      },
    },
  ],
  certifications: [
    {
      type: String,
    },
  ],
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const CounsellorInfo = mongoose.model("CounsellorInfo", counsellorSchema);
export default CounsellorInfo;
