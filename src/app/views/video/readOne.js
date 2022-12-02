const Video = require("../../models/video");

module.exports = async (req, res) => {
  try {
    const { id: videoID } = req.params;
    if(!videoID || videoID.trim().length === 0) return res.status(422).json({ error: "videoId missing." });
    const video = await Video.findOne({ _id: videoID }).populate("author").exec();
    if (!video) return res.status(404).json({ error: "Video not found/exist." });
    return res.status(200).json(video);
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
