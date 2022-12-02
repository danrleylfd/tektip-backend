const Video = require("../../models/video");

// Recentes: Videos Mais Recentes -createdAt

module.exports = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
    .exec();
    if (!videos || videos.length === 0) return res.status(404).json({ error: "Videos not found/exist." });
    return res.status(200).json({ videos });
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
