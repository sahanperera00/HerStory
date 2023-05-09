import Communities from "../../models/Forum/communityModel.js";

//create community
export const createCommunity = async (req, res) => {
  const communities = req.body;
  const newCommunity = new Communities(communities);
  try {
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update community
export const updateCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const community = req.body;
    await Communities.findByIdAndUpdate(id, community);
    res.status(200).json({
      status: "community details updated",
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//view all communities
export const getCommunities = async (req, res) => {
  try {
    const communities = await Communities.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//view community by id
export const getCommunity = async (req, res) => {
  try {
    const community = await Communities.findById(req.params.id);
    res.status(200).json(community);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete community
export const deleteCommunity = async (req, res) => {
  const { id } = req.params;
  try {
    await Communities.findByIdAndRemove(id);
    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
