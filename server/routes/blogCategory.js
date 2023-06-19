const router = require("express").Router();
const controllers = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", controllers.getBlogCategories);
router.post("/", verifyAccessToken, isAdmin, controllers.createBlogCategory);

router.put(
    "/:bcid",
    verifyAccessToken,
    isAdmin,
    controllers.updateBlogCategory
);
router.delete(
    "/:bcid",
    verifyAccessToken,
    isAdmin,
    controllers.deleteBlogCategory
);
router.get("/:bcid", controllers.getBlogCategory);

module.exports = router;
