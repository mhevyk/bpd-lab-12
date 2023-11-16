const db = require("./db.js");

async function findUserByUserName(username) {
  const candidate = await db.query('SELECT * FROM "user" WHERE username=$1', [
    username,
  ]);

  if (candidate.rowCount === 0) {
    return null;
  }

  return candidate.rows[0];
}

async function createUser(username, password) {
  const response = await db.query(
    'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );

  return response.rows[0];
}

async function getRoleNameById(roleId) {
  const response = await db.query('SELECT name FROM "role" WHERE role_id=$1', [
    roleId,
  ]);

  if (response.rowCount === 0) {
    return null;
  }

  return response.rows[0];
}

async function addRoleToUser(roleId, userId) {
  await db.query('INSERT INTO "user_role" (user_id, role_id) VALUES ($1, $2)', [
    userId,
    roleId,
  ]);
}

async function findUserRoles(userId) {
  const response = await db.query(
    `SELECT "role".name FROM "user" 
    INNER JOIN "user_role" USING (user_id)
    INNER JOIN "role" USING (role_id)
    WHERE user_id=$1;`,
    [userId]
  );

  return response.rows ?? [];
}

async function findUsers() {
  const response = await db.query('SELECT * from "user"');
  return response.rows;
}

module.exports = {
  findUserByUserName,
  createUser,
  getRoleNameById,
  addRoleToUser,
  findUserRoles,
  findUsers,
};
