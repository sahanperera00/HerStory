import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
