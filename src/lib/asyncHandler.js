import { sendResponse } from "./response";

export const asyncHandler = (fn) => async (req, ...args) => {
  try {
    return await fn(req, ...args);
  } catch (error) {
    console.error(error);
    return sendResponse(false, "Something went wrong, please try again later", 500);
  }
};
