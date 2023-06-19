const router = require("express").Router();
const controllers = require("../controllers/insert");

router.post("/", controllers.insertDataProduct);
router.post("/cate", controllers.insertDataCategory);

module.exports = router;
