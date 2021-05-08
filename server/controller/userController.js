const User = require("../model/User");
const asyncHandler = require("express-async-handler");

//search user
exports.searchUser = asyncHandler(async (req, res) => {
  const user = await User.find({ username: { $regex: req.query.username } })
    .limit(10)
    .select("fullname username avatar");

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ message: "not found" });
  }
});

//get user
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

//update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const {
    avatar,
    fullname,
    mobile,
    address,
    website,
    story,
    gender,
  } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      avatar,
      fullname,
      mobile,
      address,
      website,
      story,
      gender,
    }
  );

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ meesage: "Something wrong!" });
  }
});
