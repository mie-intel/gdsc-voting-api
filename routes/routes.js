const express = require("express");
const userModel = require("../model/userModel");
const candidateModel = require("../model/candidateModel");

const routes = express.Router();

// Home page
routes.get("/", async (req, res) => {
  const userData = await userModel.find();
  return res.send(userData);
});

// user
routes.post("/user/create", async (req, res) => {
  const userData = req.body;
  let success = true;
  console.log(userData);
  for (user of userData) {
    console.log(user);
    try {
      console.log("USER", user.username);
      const isExist = await userModel.findOne({ username: user.username });
      if (isExist) {
        success = false;
        continue;
      }

      const data = new userModel({
        username: user.username,
        password: user.password,
        hasVote: "",
      });

      const dataToSave = await data.save();
      console.log(dataToSave);
    } catch (error) {
      success = false;
    }
  }
  if (success) res.status(200).send("all data saved successfully");
  else res.status(400).send("some data not saved successfully");
});

routes.delete("/user/delete", async (req, res) => {
  console.log(req.body);

  try {
    const username = req.body.username;

    const result = await userModel.findOneAndDelete({
      username: username,
    });

    return res.send(`Candidate by name ${username} has been deleted!`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// candidate
routes.post("/candidate/create", async (req, res) => {
  console.log(req.body);
  const data = new candidateModel({
    candidateName: req.body.candidateName,
    voteCount: 0,
  });

  try {
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.delete("/candidate/delete", async (req, res) => {
  console.log(req.body);

  try {
    const candidateName = req.body.candidateName;

    const result = await candidateModel.findOneAndDelete({
      candidateName: candidateName,
    });

    return res.send(`Candidate by name ${candidateName} has been deleted!`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.patch("/candidate/vote", async (req, res) => {
  try {
    const { username, candidateName } = req.body;
    const userData = await userModel.findOne({ username: username });
    if (userData === null) return res.status(400).send(`user not found!`);
    console.log(userData);
    if (userData.hasVote !== "") return res.send(`user ${username} has voted`);
    console.log(userData);
    userData.hasVote = candidateName;
    let result = await userModel.findOneAndUpdate(
      { username: username },
      userData,
      { new: true }
    );
    let candidateData = await candidateModel.findOne({
      candidateName: candidateName,
    });

    candidateData.voteCount += 1;

    result = await candidateModel.findOneAndUpdate(
      { candidateName: candidateName },
      candidateData,
      { new: true }
    );

    return res.send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// all
routes.get("/user/showAll", async (req, res) => {
  try {
    const userData = await userModel.find();
    return res.status(200).json({ user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.get("/candidate/showAll", async (req, res) => {
  try {
    const candidateData = await candidateModel.find();
    return res.status(200).json({ candidate: candidateData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.get("/showAll", async (req, res) => {
  try {
    const candidateData = await candidateModel.find();
    const userData = await userModel.find();
    return res.status(200).json({ candidate: candidateData, user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.patch("/resetAllVote", async (req, res) => {
  try {
    await userModel.updateMany({ $set: { hasVote: "" } });
    await candidateModel.updateMany({ $set: { voteCount: 0 } });
    return res.send("Anjay ke reset semua");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.delete("/deleteAll", async (req, res) => {
  try {
    await userModel.deleteMany({});
    await candidateModel.deleteMany({});
    return res.send("Anjay ke reset semua");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = routes;
