import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validateRegister } from "../validations/auth.validation.js";
import { validateLogin } from "../validations/auth.validation.js";

import { generateToken } from "../utils/generateToken.js";

export const registerService = async (data) => {
  // ✅ Validate input
  validateRegister(data);

  const { email, password } = data;

  // ✅ Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  //  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken(user);

  return {
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};
export const loginService = async (data) => {
  validateLogin(data);

  const { email, password } = data;

  // Check user
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate token
  const token = generateToken(user);

  return {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};