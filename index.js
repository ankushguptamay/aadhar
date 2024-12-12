require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const {
  SPRINT_AADHAR_AUTHORISED_KEY,
  SPRINT_AADHAR_JWT_TOKEN,
  PORT = 8080,
} = process.env;

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addAadharCard", async (req, res) => {
  try {
    const url = "https://api.verifya2z.com/api/v1/verification/aadhaar_sendotp";

    const headers = {
      "Content-Type": "application/json",
      Token: SPRINT_AADHAR_JWT_TOKEN,
      accept: "application/json",
      // authorisedkey: SPRINT_AADHAR_AUTHORISED_KEY,
    };

    const data = {
      id_number: req.body.aadharCardNumber,
    };

    const verify = await axios.post(url, data, { headers });
    console.log(verify.data);
    // Final response
    res.status(200).send({
      success: true,
      message: "Added successfully!",
      data: verify,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});

app.post("/verifyAadharOTP", async (req, res) => {
  try {
    const url =
      "https://uat.paysprint.in/sprintverify-uat/api/v1/verification/aadhaar_verifyotp";

    const headers = {
      "Content-Type": "application/json",
      Token: SPRINT_AADHAR_JWT_TOKEN,
      accept: "application/json",
      authorisedkey: SPRINT_AADHAR_AUTHORISED_KEY,
    };

    const data = {
      client_id: req.body.client_id,
      otp: req.body.otp,
      refid: req.body.refid,
    };
    const verify = await axios.post(url, data, { headers });
    // Final response
    res.status(200).send({
      success: true,
      message: "Added successfully!",
      data: verify.data,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
