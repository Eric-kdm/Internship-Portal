export const getTestimonials = (req, res) => {
  res.json([
    {
      name: "Alex Rivera",
      role: "Product Design Intern",
      message:
        "InternHub isn’t just a job board; it’s a launchpad.",
    },
  ]);
};