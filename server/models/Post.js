const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  url: {
    type: "string",
  },
  status: {
    type: "string",
    enum: ["LEARNED", "TO LEARN", "LEARNING"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("post", postSchema);
