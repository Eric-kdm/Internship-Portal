import express from "express";
import cors from "cors";

import internshipRoutes from "./routes/internship.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import studentRoutes from "./routes/student.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard", dashboardRoutes); 


// TEMP TEST ROUTE (important)
app.get("/", (req, res) => {
  res.send("API is running...");
});
console.log("APPLICATION ROUTES LOADED");

export default app;