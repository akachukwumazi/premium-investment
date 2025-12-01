const rateLimitMap = new Map();

export function rateLimiter(limit = 5, windowMs = 60000) { // 5 requests/minute
  return async (req) => {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, last: now };

    if (now - userData.last < windowMs) {
      if (userData.count >= limit) {
        return {
          limited: true,
          response: new Response(
            JSON.stringify({
              success: false,
              message: "Too many requests, please try again later.",
            }),
            { status: 429, headers: { "Content-Type": "application/json" } }
          ),
        };
      }
      userData.count++;
    } else {
      userData.count = 1;
      userData.last = now;
    }

    rateLimitMap.set(ip, userData);
    return { limited: false };
  };
}
