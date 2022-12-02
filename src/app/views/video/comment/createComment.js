const Video =  require("../../../controllers/video");
const { Comment } = require("../../../models/engagement");

module.exports = async (req, res) => {
  try {
    const { id: author } = req.query;
    const { id: video } = req.params;
    const { content } = req.body;
    if (!author || author.trim().length === 0) return res.status(422).json({ error: "authorId missing." });
    if (!video || video.trim().length === 0) return res.status(422).json({ error: "videoId missing." });
    if (!content || content.trim().length === 0) return res.status(422).json({ error: "content missing." });
    const _comment = await Comment.findOne({ author, video, content });
    if (_comment) await Comment.findByIdAndDelete(_comment._id);
    else if (!_comment) {
      const comment = await Comment.create({ author, video, content });
      await Video.findOneAndUpdate(
        { _id: video },
        { $push: { shares: [comment._id] } },
        { new: true }
      );
    }
    return res.status(200).send();
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
