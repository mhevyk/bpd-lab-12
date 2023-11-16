const Router = require("express");
const authController = require("../controllers/authController.js");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");

const router = Router();

router.post(
  "/registration",
  check("username", "Поле email не може бути порожнім").notEmpty(),
  check(
    "password",
    "Пароль не може бути меншим 4 символів і більше 10 символів"
  ).isLength({ min: 4, max: 10 }),
  authController.registration
);
router.post("/login", authController.login);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  authController.getUsers
);

module.exports = router;
