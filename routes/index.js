const express = require("express");
const router = express.Router();

const user = require("../models/users");

//view all
router.get("/view", async (req, res) => {
  try {
    const foundUsers = await user.find(); //find all users
    res.json(foundUsers);
  } catch (err) {
    res.status(500).json({ message: err.message }); //500 = server side error
  }
});

//view one based on input id
router.get("/view/:id", async (req, res) => {
  let userID = req.params.id;
  try {
    const foundUsers = await user.findById(userID);
    res.json(foundUsers);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

//add user
router.post("/add", async (req, res) => {
  //get the parametes from the body
  const user_to_save = new user({
    name: req.body.name,
    surname: req.body.surname,
  });

  try {
    const newUser = await user_to_save.save(); //save the params in the database
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete one based on the input id
router.delete("/delete/:id", async (req, res) => {
  let userID = req.params.id;

  try {
    const deletedUser = await user.findByIdAndDelete(userID);
    if (deletedUser) {
      //if user was found and deleted successfully
      return res.json({ message: "User was deleted" });
    } else {
      return res.json({ message: "User was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update on based on input id
router.patch("/update/:id", async (req, res) => {
  let userID = req.params.id;

  try {
    const foundUsers = await user.findById(userID);
    if (foundUsers == null) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name != null) {
      foundUsers.name = req.body.name;
    }
    if (req.body.surname != null) {
      foundUsers.surname = req.body.surname;
    }

    try {
      const updatedUser = await foundUsers.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
