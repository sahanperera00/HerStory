import mongoose from "mongoose";

const complaintSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    nic: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    placeOfOccurance: {
      type: String,
      required: true,
    },
    files: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
