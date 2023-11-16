const { validationResult } = require("express-validator");
const db = require("../database/db.js");
const APIError = require("../exceptions/APIError.js");
const jwt = require("jsonwebtoken");
const {
  findUserByUserName,
  createUser,
  getRoleNameById,
  addRoleToUser,
  findUserRoles,
  findUsers,
} = require("../database/queries.js");
const bcrypt = require("bcryptjs");
const config = require("../config.js");

function generateAccessToken(userId, roles) {
  const payload = { userId, roles };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "24h" });
}

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(APIError.Validation(errors.array()));
      }

      const { username, password, roleId = 1 } = req.body;

      const candidate = await findUserByUserName(username);

      if (candidate !== null) {
        return next(APIError.BadRequest("Користувач з таким іменем вже існує"));
      }

      await db.query("BEGIN TRANSACTION");

      const hashedPassword = await bcrypt.hash(password, 3);
      const user = await createUser(username, hashedPassword);

      const role = await getRoleNameById(roleId);

      if (role === null) {
        return next(APIError.BadRequest("Ролі не існує"));
      }

      await addRoleToUser(roleId, user.user_id);
      await db.query("COMMIT");

      res.json({ message: "Користувач успішно зареєстрований" });
    } catch (error) {
      await db.query("ROLLBACK");
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await findUserByUserName(username);

      if (user === null) {
        return next(
          APIError.BadRequest("Користувач з таким іменем не знайдений")
        );
      }

      const arePasswordsEqual = await bcrypt.compare(password, user.password);

      if (!arePasswordsEqual) {
        return next(APIError.BadRequest("Неправильний пароль"));
      }

      const roles = await findUserRoles(user.user_id);

      const token = generateAccessToken(
        user.user_id,
        roles.map(role => role.name)
      );
      res.json({ token, roles });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await findUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
