const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

exports.registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password, gender } = req.body;

  let newUserName = username.toLowerCase().replace(/ /g, "");

  const user_name = await User.findOne({ username: newUserName });
  if (user_name)
    return res.status(400).json({ message: "This username already exist" });

  const user_email = await User.findOne({ email });
  if (user_email)
    return res.status(400).json({ message: "This email id already exist" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be more than 6 characters" });

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new User({
    fullname,
    username: newUserName,
    email,
    password: passwordHash,
    gender,
  });

  await newUser.save();

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      token: generateToken(newUser._id),
    });
  } else {
    return res.status(400).json({ message: "Not Found" });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate(
    "followers,following",
    "-password"
  );

  if (!user) return res.status(400).json({ message: "Invalid email address" });

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword)
    return res.status(400).json({ message: "Password Incorrect" });

  if (user) {
    res.status(200).json({ user, token: generateToken(user._id) });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
});
