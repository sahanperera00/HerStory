import Category from "../../../models/counselling/category/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new Category({
    name,
    description,
  });
  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
