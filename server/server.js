const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is runing on ${port}`.yellow.cyan);
});
