import { client } from "@/lib/sanity";

export async function getUserActivities(userId) {
  const query = `
    *[_type == "userActivity" && user._ref == $userId] 
    | order(timestamp desc) {
      _id,
      action,
      details,
      timestamp
    }
  `;
  const activities = await client.fetch(query, { userId });
  return activities;
}
