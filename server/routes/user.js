const router = require("express").Router();
const controllers = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/refreshtoken", controllers.refreshAccessToken);
router.get("/", verifyAccessToken, isAdmin, controllers.getUsers);
router.put("/update-address", verifyAccessToken, controllers.updateAddressUser);
router.put("/cart", verifyAccessToken, controllers.updateCart);
router.put("/current", verifyAccessToken, controllers.updateUser);
router.put("/:uid", verifyAccessToken, isAdmin, controllers.updateUserByAdmin);
router.delete("/", verifyAccessToken, isAdmin, controllers.deleteUser);
router.get("/current", verifyAccessToken, controllers.getUser);
router.get("/forgot-password", controllers.forgotPassword);
router.get("/logout", controllers.logout);
router.put("/reset-password", controllers.resetPassword);

module.exports = router;
