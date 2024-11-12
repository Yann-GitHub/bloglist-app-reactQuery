const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("../utils/middleware");

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "Password must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

// Use the verifyToken middleware for all routes below this line
// if the token is valid, the middleware will extract the user object from the token and add it to the request object
usersRouter.use(authenticateToken);

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
    });
    response.json(users);
  } catch (exception) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

usersRouter.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate("blogs", {
      title: 1,
    });
    response.json(user);
  } catch (exception) {
    response.status(404).json({ error: "User not found" });
  }
});

module.exports = usersRouter;
