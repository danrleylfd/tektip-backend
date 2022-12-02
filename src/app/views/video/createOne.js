const Video = require("../../models/video");

module.exports = async (req, res) => {
  try {
    const { id: author } = req.query;
    if (!author || author.trim().length === 0) return res.status(422).json({ error: "author missing." });
    const { content, thumbnail, fileUrl } = req.body;
    if (!content || content.trim().length === 0) return res.status(422).json({ error: "content missing." });
    if (!thumbnail || thumbnail.trim().length === 0) return res.status(422).json({ error: "thumbnail missing." });
    if (!fileUrl || fileUrl.trim().length === 0) return res.status(422).json({ error: "fileUrl missing." });
    const _video = await Video.findOne({
      author: author,
      content: content.trim(),
      thumbnail: thumbnail.trim(),
      fileUrl: fileUrl.trim()
    });
    if (_video) return res.status(401).json({ error: "Video already exists." });
    const video = await Video.create({
      author: author,
      content: content.trim(),
      thumbnail: thumbnail.trim(),
      fileUrl: fileUrl.trim()
    });
    return res.status(201).json({ id: video._id });
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
