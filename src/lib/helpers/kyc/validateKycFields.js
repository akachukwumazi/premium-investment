const VALID_MARITAL_STATUSES = [
  "single", "married", "divorced", "widowed",
  "separated", "in a relationship", "engaged",
  "domestic partnership", "civil union", "it's complicated",
];

const VALID_ID_TYPES = [
  "passport", "national_id", "drivers_license", "social_security_number",
];

export const validateKycFields = ({ fullName, email, address, maritalStatus, dob, idType, idNumber, idFront, idBack }) => {
  if (!fullName) return "Full name is required";
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
  if (!address) return "Address is required";
  if (!maritalStatus) return "Marital status is required";
  if (!VALID_MARITAL_STATUSES.includes(maritalStatus)) {
    return `Invalid marital status selected. Allowed values: ${VALID_MARITAL_STATUSES.join(", ")}`;
  }
  if (!dob) return "Date of birth is required";
  if (!idType) return "ID type is required";
  if (!VALID_ID_TYPES.includes(idType)) {
    return `Invalid ID type selected. Allowed values: ${VALID_ID_TYPES.join(", ")}`;
  }
  if (!idNumber) return "Identification number is required";
  if (!/^[A-Za-z0-9-]+$/.test(idNumber)) return "Invalid ID number format";
  if (!idFront || !idFront.size) return "Front ID image is required";
  if (idType !== "passport" && (!idBack || !idBack.size)) return "Back ID image is required for this ID type";

  return null;
};
