const router = require("express").Router();
const controllers = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/admin", verifyAccessToken, isAdmin, controllers.getOrdersByAdmin);
router.get("/", verifyAccessToken, controllers.getOrderByUser);
router.post("/", verifyAccessToken, isAdmin, controllers.createOrder);
router.put("/:oid", verifyAccessToken, isAdmin, controllers.updateStatusOrder);

module.exports = router;
