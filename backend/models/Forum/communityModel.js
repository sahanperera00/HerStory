import mongoose from "mongoose";

const communitiesSchema = mongoose.Schema({
  comID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },
});

const Community = mongoose.model("Community", communitiesSchema);
export default Community;
