export const validateFields = (fields, body) => {
  for (const field of fields) {
    switch (field) {
      case "email":
        if (!body.email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
          return "Invalid email format";
        break;

      case "password":
        if (!body.password) return "Password is required";
        const trimmed = body.password.trim();
        if (!trimmed) return "Password cannot be empty";
        if (trimmed.length < 8)
          return "Password must be at least 8 characters long";

        // Strength check — at least 1 uppercase, 1 lowercase, 1 number, and 1 special char
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}<>])[A-Za-z\d@$!%*?&#^()[\]{}<>]{8,}$/;
        if (!passwordRegex.test(trimmed))
          return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        break;

      case "fullName":
        if (!body.fullName || body.fullName.trim().length < 3)
          return "Full name is required and must be at least 3 characters long";
        if (!/^[a-zA-Z\s.'-]+$/.test(body.fullName.trim()))
          return "Name contains invalid characters";
        break;

      case "phoneNumber":
        if (!body.phoneNumber) return "Phone number is required";
        break;

      default:
        break;
    }
  }
  return null;
};
