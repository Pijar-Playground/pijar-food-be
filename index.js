// import / intial
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // node_modules
const db = require("./database"); // directory kita

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routing

// get data by id
app.get("/profile/:id", async function (req, res) {
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

    const query = await db`SELECT * FROM users WHERE id = ${id}`;

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
});

// get all data
app.get("/profile", async function (req, res) {
  const query = await db`SELECT * FROM users`;

  res.json({
    status: true,
    message: "Get data success",
    data: query,
  });
});

// insert data
app.post("/profile", async function (req, res) {
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

  const query = await db`INSERT INTO users ${db(
    payload,
    "fullname",
    "email",
    "password"
  )} returning *`;

  res.send({
    status: true,
    message: "Success insert data",
    data: query,
  });
});

// edit data
app.patch("/profile/:id", async function (req, res) {
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

  const checkData = await db`SELECT * FROM users WHERE id = ${id}`;

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

  const query = await db`UPDATE users set ${db(
    payload,
    "fullname",
    "email",
    "password"
  )} WHERE id = ${id} returning *`;

  res.send({
    status: true,
    message: "Success edit data",
    data: query,
  });
});

// delete data
app.delete("/profile/:id", async function (req, res) {
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

  const checkData = await db`SELECT * FROM users WHERE id = ${id}`;

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const query = await db`DELETE FROM users WHERE id = ${id} returning *`

  res.send({
    status: true,
    message: "Success delete data",
    data: query,
  });
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

// listener
app.listen(3000, () => {
  console.log("App running in port 3000");
});
