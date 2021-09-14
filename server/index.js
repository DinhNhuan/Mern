const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
require("dotenv").config();
const cors = require("cors");

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.k5dwv.mongodb.net/mern-learnit?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    console.log("db conected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
// readable data username and password ... send from application with Content-Type
app.use(express.json());

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => console.log(`Server started on port ${PORT}`));
