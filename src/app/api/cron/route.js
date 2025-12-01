// // app/api/cron/route.js
// import cron from "node-cron";
// import axios from "axios";

// cron.schedule("*/5 * * * *", async () => {
//   console.log("⏰ Running updateInvestments cron every 5 minutes...");
//   try {
//     await axios.post("http://localhost:3000/api/cron/updateInvestments");
//     console.log("✅ updateInvestments executed successfully");
//   } catch (error) {
//     console.error("❌ updateInvestments failed:", error.message);
//   }
// });

// export async function GET() {
//   return Response.json({ message: "Cron job is active and running every 5 minutes." });
// }
