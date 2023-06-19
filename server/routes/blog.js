const router = require("express").Router();
const controllers = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.get("/", controllers.getBlogs);
router.post("/", verifyAccessToken, isAdmin, controllers.createBlog);

router.put(
    "/upload-image/:bid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.single("images"),
    controllers.uploadImagesBlog
);
router.put("/like/:bid", verifyAccessToken, controllers.likeBlog);
router.put("/dislike/:bid", verifyAccessToken, controllers.dislikeBlog);
router.get("/:bid", controllers.getBlog);
router.put("/:bid", verifyAccessToken, isAdmin, controllers.updateBlog);
router.delete("/:bid", verifyAccessToken, isAdmin, controllers.deleteBlog);

module.exports = router;
