const router = require("express").Router();
const controllers = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", controllers.getProductCategories);
router.post("/", verifyAccessToken, isAdmin, controllers.createProductCategory);

router.put(
    "/:pcid",
    verifyAccessToken,
    isAdmin,
    controllers.updateProductCategory
);
router.delete(
    "/:pcid",
    verifyAccessToken,
    isAdmin,
    controllers.deleteProductCategory
);
router.get("/:pcid", controllers.getProductCategory);

module.exports = router;
