import { client } from "@/lib/sanity";

export async function logUserActivity(userId, action, details = '', status = 'pending') {
  await client.create({
    _type: 'userActivity',
    user: {
      _type: 'reference',
      _ref: userId,
    },
    action,
    details,
    status, // 👈 include status
    timestamp: new Date().toISOString(),
  });
}
