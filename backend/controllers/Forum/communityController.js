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
  const { id } = req.params;
  const community = req.body;
  try {
    const updatedCommunity = await community.findByIdAndUpdate(id, community, {
      new: true,
    });
    res.status(200).json(updatedCommunity);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
