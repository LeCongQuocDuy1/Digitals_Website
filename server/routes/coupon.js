const router = require("express").Router();
const controllers = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", controllers.getCoupons);
router.post("/", verifyAccessToken, isAdmin, controllers.createCoupon);

router.put("/:cp", verifyAccessToken, isAdmin, controllers.updateCoupon);
router.delete("/:cp", verifyAccessToken, isAdmin, controllers.deleteCoupon);
router.get("/:cp", controllers.getCoupon);

module.exports = router;
