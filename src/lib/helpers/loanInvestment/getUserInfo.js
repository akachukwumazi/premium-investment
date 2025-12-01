import { client } from "@/lib/sanity";

export async function getUserInfo(userId) {
  try {
    const userDoc = await client.fetch(
      `*[_type=="user" && _id==$userId][0]{ _id, name, email }`,
      { userId }
    );

    if (!userDoc) return { success: false, message: "User not found", status: 404 } ;
    return { success: true, message: "User fetched successfully", status: 200, data: userDoc };
  } catch (err) {
    console.error("❌ getUserInfo error:", err);
    return {
      success: false,
      message: "Failed to fetch user info",
      status: 500,
      data: { details: err.message },
    };
  }
}
