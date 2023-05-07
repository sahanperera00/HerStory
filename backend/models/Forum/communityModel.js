import mongoose from "mongoose";

const communitiesSchema = mongoose.Schema({
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
  },
});

const Community = mongoose.model("Community", communitiesSchema);
export default Community;
