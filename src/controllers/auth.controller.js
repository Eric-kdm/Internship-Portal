import { registerService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import { loginService } from "../services/auth.service.js";

export const loginUser = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};