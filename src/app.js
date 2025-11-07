const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "devX$1919");
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token");
    }
    const decoded = jwt.verify(token, "devX$1919");
    const { _id } = decoded;
    const user = await User.findById({ _id: _id });
    if(!user){
      throw new Error("user does not exist")
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["password", "photoUrl", "skills", "gender"];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error("update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).send("user not found");
    } else {
      res.send("user updated successfully");
    }
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("db connection established");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("db connection not established");
  });
