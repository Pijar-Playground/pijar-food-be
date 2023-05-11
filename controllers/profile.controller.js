const model = require("../models/profile.models");

const getProfileById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      });

      return;
    }

    const query = await model.getUserById(id);

    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in server",
    });
  }
};

const getAllProfile = async function (req, res) {
  try {
    const query = await model.getAllUser();

    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in server",
    });
  }
};

const addNewProfile = async function (req, res) {
  // database.push(req.body);
  const { fullname, email, password } = req.body;

  // validasi input
  if (!(fullname && email && password)) {
    res.status(400).json({
      status: false,
      message: "Bad input, please complete all of fields",
    });

    return;
  }

  const payload = {
    fullname,
    email,
    password,
  };

  const query = await model.insertUser(payload);

  res.send({
    status: true,
    message: "Success insert data",
    data: query,
  });
};

const editProfile = async function (req, res) {
  const {
    params: { id },
    body: { fullname, email, password },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await model.getUserById(id);

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const payload = {
    fullname: fullname ?? checkData[0].fullname,
    email: email ?? checkData[0].email,
    password: password ?? checkData[0].password,
  };

  const query = await model.editUser(payload, id);

  res.send({
    status: true,
    message: "Success edit data",
    data: query,
  });
};

const deleteProfile = async function (req, res) {
  const {
    params: { id },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await model.getUserById(id);

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const query = await model.deleteUser(id);

  res.send({
    status: true,
    message: "Success delete data",
    data: query,
  });
};

module.exports = {
  getProfileById,
  getAllProfile,
  addNewProfile,
  editProfile,
  deleteProfile,
};
