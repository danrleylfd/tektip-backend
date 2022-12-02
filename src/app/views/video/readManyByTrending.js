const Video = require("../../models/video");

// Populares: videos Mais Populares -likeCount + -commentCount + -shareCount

module.exports = async (req, res) => {
  try {
    const byRelevance = await Video.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
      .exec();
    const videos = byRelevance.sort((v0, v1) => v1.engageCount - v0.engageCount);
    return res.status(200).json({ videos });
    // return res.status(200).json({
    //   videos: videos.map(video => ({
    //     _id: video._id,
    //     engageCount: video.engageCount,
    //     likesCount: video.likesCount,
    //     commentsCount: video.commentsCount,
    //     sharesCount: video.sharesCount,
    //     createdAt: video.createdAt,
    //     content: video.content,
    //     thumbnail: video.thumbnail,
    //     fileUrl: video.fileUrl,
    //     author: video.author,
    //   }))
    // });
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
