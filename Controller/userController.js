const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel} = require("../Models/userModel");
require('dotenv').config();


// New User When Register

const registerUser = async (req, res) => {
    const { Username, EmailId, Password, DateOfBirth, Role, Location } = req.body;
    try {
      bcrypt.hash(Password, 5, async (err, secure_password) => {
        if (err) {
          res.send({
              "Message" : `Error in hashing : ${err}`
          })
          console.log(err + `Error in bcrypt`);
        } else {
            const user = new UserModel({
              Username,
              EmailId,
              Password: secure_password,
              DateOfBirth,
              Role,
              Location,
            });
          await user.save();
          res.send({
            "Message": "Successfully Registered",
          });
        }
      });
    } catch (error) {
      console.log(`Error in /register : ${error}`);
      res.send({
        "Error in /register": `${error}`,
      });
    }
}

// While Login 

const loginUser = async (req, res) => {
    const { EmailId, Password } = req.body;
    try {
      const userData = await UserModel.find({ EmailId });
  
      if (userData.length > 0) {
        bcrypt.compare(Password, userData[0].Password, (err, result) => {
          if (result) {
            const token = jwt.sign({ UserID: userData[0]._id }, process.env.key ,{expiresIn:"24h"});
            res.send({
              "Message": "Login successful",
              "Token": token,
            });

          } else {
            res.send("Wrong Credentials");
          }
        });
      } else {
        res.send({
            "Message": "Login failed"
        });
      }
    } catch (error) {
      res.send("Something went wrong");
      console.log("Error: " + error);
    }
}


module.exports = {registerUser,loginUser}