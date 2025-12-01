export const sanitizeInput = (data = {}) => {
  if (typeof data === "string") {
    return data.trim().replace(/\s+/g, " ").replace(/[<>]/g, "");
  }

  const sanitized = {};
  for (const key in data) {
    if (!data[key]) continue;
    let value = String(data[key]).trim().replace(/\s+/g, " ");
    value = value.replace(/[<>]/g, "");
    sanitized[key] = value;
  }

  return sanitized;
};
