import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);

    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    // console.log(email, password);
    next();
  } catch (error) {
    console.log(error);
  }
};

export default protect;
