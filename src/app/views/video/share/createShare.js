const Video = require("../../../models/video");

module.exports = async (req, res) => {
  try {
    const { id: user } = req.query;
    const { id: videoID } = req.params;
    if (!user || user.trim().length === 0) return res.status(422).json({ error: "user missing." });
    if (!videoID || videoID.trim().length === 0) return res.status(422).json({ error: "videoID missing." });
    const _video = await Video.findOne({ _id: videoID });
    const isIncluded = _video.shares.some(share => share.equals(user));
    if (!isIncluded) {
      await Video.findOneAndUpdate(
        { _id: videoID },
        { $push: { shares: [user] } },
        { new: true }
      );
    }
    return res.status(200).send();
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
