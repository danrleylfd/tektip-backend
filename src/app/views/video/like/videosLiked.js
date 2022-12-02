const Video = require("../../../models/video");

module.exports = async (req, res) => {
  try {
    const { id: user } = req.query;
    if (!user || user.trim().length === 0) return res.status(422).json({ error: "user missing." });
    const videos = await Video.find({ likes: { $in: [user] } }).exec();
    return res.status(200).json(videos);
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
