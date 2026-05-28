import Joi from "joi";

export const validateApplication = (data) => {
  const schema = Joi.object({
    student: Joi.string().required(),
    internship: Joi.string().required(),
    status: Joi.string().valid("pending", "accepted", "rejected")
  });

  return schema.validate(data);
};