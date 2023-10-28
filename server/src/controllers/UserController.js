const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const authenticate = require("../services/Authenticate");
const emailSend = require("../services/SendEmail");

const prisma = new PrismaClient();

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("User sign in: all fields are mendadotry!");
    }

    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userData) {
      throw new Error(
        "User sign in: user doesn't exist or wrong credentials try again!"
      );
    }

    if (!(await bcrypt.compare(password, userData.password))) {
      throw new Error("User sign in: wrong password try again!");
    }

    const auth = await authenticate(userData.id, userData.email, "200");

    if (!auth) {
      throw new Error("User sign in: error in authentication - jwt");
    }

    res.status(200).json({ token: auth });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("User sign up: all fields are mendatory!");
    }

    const findEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      throw new Error("User sign up: email already exist!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new Error("User sign up: can't hash password!");
    }

    const addedUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!addedUser) {
      throw new User("User sign up: can't add user to db!");
    }

    res.status(200).json({ message: "Sing up user added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      throw new Error("Change password: all fields are mandatory");
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    if (!hashedPassword) {
      throw new Error("Change password: can't hash new password");
    }

    const updated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!updated) {
      throw new Error("Change password: can't update password in db");
    }

    res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Forget password: all fields are mendatory!");
    }

    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userData) {
      throw new Error(
        "Forget password: user doesn't exist or wrong credentials try again!"
      );
    }

    const token = await authenticate(userData.id, userData.email, "5");

    if (!token) {
      throw new Error("Forget password: error in authentication - jwt");
    }

    const sender = await emailSend(userData.email, token);

    if (!sender) {
      throw new Error("Forget Password: can't send email to client!");
    }

    res.status(200).json({ message: "Change Password: look up your emails." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  userSignIn,
  userSignUp,
  forgetPassword,
  changePassword,
};
