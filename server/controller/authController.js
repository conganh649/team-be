var userService = require("../services/userService");

const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox068b1b4ddef449cd8d81a4dd15ca0d42.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

exports.signup = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    let emailVerification = "";
    const user = await userService.createOne(req);
    const newUserId = user.id;
    const token = jwt.sign(
      {
        newUserId,
      },
      process.env.JWT_ACC_ACTIVATE,
      { expiresIn: "1d" }
    );
    const url = `http://localhost:3002/api/activation/${token}`;
    const data = {
      from: "app@test.com",
      to: req.body.email,
      subject: "Email Activation",
      text: `Please click this link to confirm your email: "${url}"`,
    };
    mg.messages().send(data, function (error, body) {
      emailVerification = body.message;
      console.log(emailVerification);
      res.status(200).json({
        success: true,
        message: "Create user successfully",
        data: user,
        verification: emailVerification,
      });
    });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};

exports.activateAccount = async (req, res) => {
  const id = jwt.verify(req.params.token, process.env.JWT_ACC_ACTIVATE);

  try {
    const result = await userService.activateByEmail({
      id: id.newUserId,
      activated: true,
    });
    res
      .status(200)
      .json({ success: result, message: "User activated successfully" });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};
