import Internship from "../models/internship.model.js";
import Application from "../models/application.model.js";

export const getEmployerAnalytics = async (req, res) => {
  try {
    const employerId = req.user._id;

    // Step 1: Get internship IDs
    const internships = await Internship.find({
      createdBy: employerId,
    }).select("_id");

    const internshipIds = internships.map((i) => i._id);

    // Step 2: Core stats aggregation
    const stats = await Application.aggregate([
      {
        $match: {
          internship: { $in: internshipIds },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    let totalApplications = 0;
    let accepted = 0;
    let rejected = 0;
    let pending = 0;

    stats.forEach((item) => {
      totalApplications += item.count;

      if (item._id === "accepted") accepted = item.count;
      else if (item._id === "rejected") rejected = item.count;
      else pending += item.count;
    });

    // Step 3: Trend (last 7 days)
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const trend = await Application.aggregate([
      {
        $match: {
          internship: { $in: internshipIds },
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Step 4: Top internships
    const topInternships = await Application.aggregate([
      {
        $match: {
          internship: { $in: internshipIds },
        },
      },
      {
        $group: {
          _id: "$internship",
          applications: { $sum: 1 },
        },
      },
      { $sort: { applications: -1 } },
      { $limit: 5 },
    ]);

    await Internship.populate(topInternships, {
      path: "_id",
      select: "title company",
    });

    // Step 5: Monthly stats
    const monthlyStats = await Application.aggregate([
      {
        $match: {
          internship: { $in: internshipIds },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Step 6: Conversion rate
    const conversionRate =
      totalApplications > 0
        ? ((accepted / totalApplications) * 100).toFixed(2)
        : 0;

    // FINAL RESPONSE
    res.status(200).json({
      success: true,
      data: {
        totalInternships: internshipIds.length,
        totalApplications,
        accepted,
        rejected,
        pending,
        conversionRate,
        trend,
        topInternships,
        monthlyStats,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};