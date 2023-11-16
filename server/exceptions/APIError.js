module.exports = class APIError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message) {
    return new APIError(message, 400);
  }

  static Validation(errors) {
    return new APIError("Помилка валідації", 400, errors);
  }

  static Unauthorized() {
    return new APIError("Користувач не авторизований", 401);
  }

  static Forbidden(roles = []) {
    return new APIError(
      `Нема доступу, допустимі ролі: ${roles.join(", ")}`,
      403
    );
  }
};
