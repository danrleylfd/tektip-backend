const mongoose = require("../../utils/database");

const VideoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: false
  }],
  shares: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

VideoSchema.virtual("likesCount").get(function () { return this.likes.length });
VideoSchema.virtual("commentsCount").get(function () { return this.comments.length });
VideoSchema.virtual("sharesCount").get(function () { return this.shares.length });
VideoSchema.virtual("engageCount").get(function () { return this.likes.length + this.comments.length + this.shares.length });
module.exports = mongoose.model("Video", VideoSchema);
