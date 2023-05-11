const db = require("../database"); // directory kita

const getUserById = async (id) => {
  try {
    const query = await db`SELECT * FROM users WHERE id = ${id}`;

    return query;
  } catch (error) {
    return error;
  }
};

const getAllUser = async () => {
  try {
    const query = await db`SELECT * FROM users`;

    return query;
  } catch (error) {
    return error;
  }
};

const insertUser = async (payload) => {
  try {
    const query = await db`INSERT INTO users ${db(
      payload,
      "fullname",
      "email",
      "password"
    )} returning *`;

    return query;
  } catch (error) {
    return error;
  }
};

const editUser = async (payload, id) => {
  try {
    const query = await db`UPDATE users set ${db(
      payload,
      "fullname",
      "email",
      "password"
    )} WHERE id = ${id} returning *`;

    return query;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const query = await db`DELETE FROM users WHERE id = ${id} returning *`;

    return query;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUserById,
  getAllUser,
  insertUser,
  editUser,
  deleteUser,
};
