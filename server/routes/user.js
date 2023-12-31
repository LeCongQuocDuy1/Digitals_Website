const router = require("express").Router();
const controllers = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", controllers.register);
router.put("/finalregister/:token", controllers.finalRegister);
router.post("/login", controllers.login);
router.post("/refreshtoken", controllers.refreshAccessToken);
router.get("/", verifyAccessToken, isAdmin, controllers.getUsers);
router.put("/reset-password", controllers.resetPassword);
router.put("/update-address", verifyAccessToken, controllers.updateAddressUser);
router.put("/cart", verifyAccessToken, controllers.updateCart);
router.put("/current", verifyAccessToken, controllers.updateUser);
router.put("/:uid", verifyAccessToken, isAdmin, controllers.updateUserByAdmin);
router.delete("/:uid", verifyAccessToken, isAdmin, controllers.deleteUser);
router.get("/current", verifyAccessToken, controllers.getUser);
router.post("/forgot-password", controllers.forgotPassword);
router.get("/logout", controllers.logout);

module.exports = router;
