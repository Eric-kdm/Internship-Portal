import { getDashboardDataService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardDataService(
      req.user._id,
      req.user.role
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};