
import { NextResponse } from "next/server";

export const sendResponse = (success, message, status = 200, data = null) => {
  return NextResponse.json(
    { success, message, ...(data && { data }) },
    { status }
  );
};
