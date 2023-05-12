const model = require("../models/profile.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;

    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      });

      return;
    }

    const checkUser = await model.getUserByEmail(email);

    if (!checkUser?.length) {
      res.status(400).json({
        status: false,
        message: "Email not registered in app",
      });

      return;
    }

    bcrypt.compare(password, checkUser[0]?.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            ...checkUser[0],
            password: null,
          },
          process.env.PRIVATE_KEY
        );

        res.json({
          status: true,
          message: "Get data success",
          data: checkUser,
          token,
        });
      } else {
         res.status(400).json({
           status: false,
           message: "Password invalid",
         });

         return;
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in server",
    });
  }
};

module.exports = {
  loginUser,
};
