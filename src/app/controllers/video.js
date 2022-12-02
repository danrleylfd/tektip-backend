const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");

const routes = Router();
routes.use(authMiddleware);

const createOne = require("../views/video/createOne");
const readManyByRecents = require("../views/video/readManyByRecents");
const readManyByTrending = require("../views/video/readManyByTrending");
const readOne = require("../views/video/readOne");

const createOrDeleteLike = require("../views/video/like/createOrDeleteOne");
const videosLiked = require("../views/video/like/videosLiked");
const createComment = require("../views/video/comment/createComment");
const createShare = require("../views/video/share/createShare");

routes.post("/", createOne);

routes.get("/recents", readManyByRecents);

routes.get("/trending", readManyByTrending);

routes.get("/:id", readOne);

routes.post("/:id/like", createOrDeleteLike);

routes.get("/liked", videosLiked);

routes.post("/:id/comment", createComment)

routes.post("/:id/share", createShare);

module.exports = app => app.use("/videos", routes);
