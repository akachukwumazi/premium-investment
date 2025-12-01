import autoCompleteHandler from "./route";

export const config = {
//   schedule: "0 0 * * *", // run daily at midnight UTC
  schedule: "*/2 * * * *", // (for testing) run every 2 minutes
};

export default async function scheduled() {
  return autoCompleteHandler();
}
