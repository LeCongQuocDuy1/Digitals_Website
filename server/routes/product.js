const router = require("express").Router();
const controllers = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.post(
    "/",
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {
            name: "images",
            maxCount: 10,
        },
        {
            name: "thumb",
            maxCount: 1,
        },
    ]),
    controllers.createProduct
);
router.get("/", controllers.getProducts);
router.put("/ratings", verifyAccessToken, controllers.ratings);

router.put(
    "/upload-image/:pid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.array("images", 10),
    controllers.uploadImagesProduct
);
router.put(
    "/:pid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {
            name: "images",
            maxCount: 10,
        },
        {
            name: "thumb",
            maxCount: 1,
        },
    ]),
    controllers.updateProduct
);
router.delete("/:pid", verifyAccessToken, isAdmin, controllers.deleteProduct);
router.get("/:pid", controllers.getProduct);

module.exports = router;
