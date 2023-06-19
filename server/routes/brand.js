const router = require("express").Router();
const controllers = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", controllers.getBrands);
router.post("/", verifyAccessToken, isAdmin, controllers.createBrand);

router.put("/:br", verifyAccessToken, isAdmin, controllers.updateBrand);
router.delete("/:br", verifyAccessToken, isAdmin, controllers.deleteBrand);
router.get("/:br", controllers.getBrand);

module.exports = router;
