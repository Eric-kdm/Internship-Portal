export const getStats = (req, res) => {
  res.json({
    students: 50000,
    companies: 1200,
    internships: 8000,
  });
};