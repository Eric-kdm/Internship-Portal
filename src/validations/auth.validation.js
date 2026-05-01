export const validateRegister = (data) => {
  const {
    role,
    email,
    password,
    firstName,
    lastName,
    companyName,
  } = data;

  if (!role || !["student", "employer"].includes(role)) {
    throw new Error("Invalid role");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (role === "student") {
    if (!firstName || !lastName) {
      throw new Error("First and Last name required for student");
    }
  }

  if (role === "employer") {
    if (!companyName) {
      throw new Error("Company name required for employer");
    }
  }
};

export const validateLogin = (data) => {
  const { email, password } = data;

  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
};