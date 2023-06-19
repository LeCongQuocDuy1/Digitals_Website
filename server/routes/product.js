const router = require("express").Router();
const controllers = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.post("/", verifyAccessToken, isAdmin, controllers.createProduct);
router.get("/", controllers.getProducts);
router.put("/ratings", verifyAccessToken, controllers.ratings);

router.put(
    "/upload-image/:pid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.array("images", 10),
    controllers.uploadImagesProduct
);
router.put("/:pid", verifyAccessToken, isAdmin, controllers.updateProduct);
router.delete("/:pid", verifyAccessToken, isAdmin, controllers.deleteProduct);
router.get("/:pid", controllers.getProduct);

module.exports = router;
