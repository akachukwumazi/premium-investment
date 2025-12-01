// // import { client } from "@/lib/sanity";
// // import { parseISO } from "date-fns";

// // const BATCH_SIZE = 200;

// // function calculateDailyIncrease(inv, hoursElapsed = 24) {
// //   const fractionOfDay = hoursElapsed / 24;
// //   switch (inv.planType) {
// //     case "crypto":
// //       return (inv.amount * inv.plan.dailyProfit) / 100 * fractionOfDay;
// //     case "loan":
// //       return (inv.interestAmount / inv.plan.duration) * fractionOfDay;
// //     case "realEstate":
// //       return (inv.amount * inv.plan.roiEstimate / 100 / (inv.plan.investmentPeriod * 30)) * fractionOfDay;
// //     case "stockBond":
// //       return (inv.unitsHeld * (inv.plan.currentPrice * inv.plan.changePercent / 100)) * fractionOfDay;
// //     default:
// //       return 0;
// //   }
// // }

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ success: false, message: "Method not allowed" });
// //   }

// //   try {
// //     console.log("Running daily investment updater:", new Date().toISOString());

// //     const activeInvestments = await client.fetch(`
// //       *[_type=="userInvestment" && status=="active"]{
// //         _id,
// //         planType,
// //         plan->,
// //         user->_id,
// //         amount,
// //         unitsHeld,
// //         expectedROI,
// //         interestAmount,
// //         startDate,
// //         updatedAt,
// //         endDate
// //       }
// //     `);

// //     for (let i = 0; i < activeInvestments.length; i += BATCH_SIZE) {
// //       const batch = activeInvestments.slice(i, i + BATCH_SIZE);

// //       const patches = batch.map(inv => {
// //         const now = new Date();
// //         const lastUpdate = parseISO(inv.updatedAt || inv.startDate);
// //         const end = parseISO(inv.endDate);
// //         const hoursElapsed = Math.max((now - lastUpdate) / (1000 * 60 * 60), 0);

// //         // If past end date, mark as completed
// //         if (now > end) {
// //           return client.patch(inv._id)
// //             .set({ status: "completed", updatedAt: now.toISOString() });
// //         }

// //         const dailyIncrease = calculateDailyIncrease(inv, hoursElapsed);

// //         // Build patch object depending on plan type
// //         let patch = client.patch(inv._id).set({ updatedAt: now.toISOString() });
// //         if (inv.planType === "loan") {
// //           patch = patch.inc({ interestAmount: dailyIncrease });
// //         } else {
// //           patch = patch.inc({ expectedROI: dailyIncrease });
// //         }
// //         return patch;
// //       });

// //       // Commit all patches concurrently in the batch
// //       await Promise.all(patches.map(p => p.commit()));
// //     }

// //     console.log(`Investment update complete: ${activeInvestments.length} records processed.`);
// //     res.status(200).json({ success: true, message: "Daily investments updated" });
// //   } catch (err) {
// //     console.error("Error updating investments:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // }


// import cron from "node-cron";
// import { client } from "@/lib/sanity";
// import { parseISO } from "date-fns";

// const BATCH_SIZE = 200;

// function calculateDailyIncrease(inv, hoursElapsed) {
//   const fractionOfDay = hoursElapsed / 24;

//   switch (inv.planType) {
//     case "crypto":
//       return (inv.amount * inv.plan.dailyProfit) / 100 * fractionOfDay;
//     case "loan":
//       return (inv.interestAmount / inv.plan.duration) * fractionOfDay;
//     case "realEstate":
//       return (inv.amount * inv.plan.roiEstimate / 100 / (inv.plan.investmentPeriod * 30)) * fractionOfDay;
//     case "stockBond":
//       return (inv.unitsHeld * (inv.plan.currentPrice * inv.plan.changePercent / 100)) * fractionOfDay;
//     default:
//       return 0;
//   }
// }

// async function updateInvestments() {
//   try {
//     console.log("Running daily investment updater:", new Date().toISOString());

//     const activeInvestments = await client.fetch(`
//       *[_type=="userInvestment" && status=="active"]{
//         _id,
//         planType,
//         plan->,
//         user->_id,
//         amount,
//         unitsHeld,
//         expectedROI,
//         interestAmount,
//         startDate,
//         updatedAt,
//         endDate
//       }
//     `);

//     for (let i = 0; i < activeInvestments.length; i += BATCH_SIZE) {
//       const batch = activeInvestments.slice(i, i + BATCH_SIZE);

//       const patches = batch.map(inv => {
//         const now = new Date();
//         const lastUpdate = parseISO(inv.updatedAt || inv.startDate);
//         const end = parseISO(inv.endDate);
//         const hoursElapsed = Math.max((now - lastUpdate) / (1000 * 60 * 60), 0);

//         if (hoursElapsed <= 0) return null;

//         // If past end date, mark as completed
//         if (now > end) {
//           return client.patch(inv._id)
//             .set({ status: "completed", updatedAt: now.toISOString() });
//         }

//         const dailyIncrease = calculateDailyIncrease(inv, hoursElapsed);

//         let patch = client.patch(inv._id).set({ updatedAt: now.toISOString() });
//         if (inv.planType === "loan") {
//           patch = patch.inc({ interestAmount: dailyIncrease });
//         } else {
//           patch = patch.inc({ expectedROI: dailyIncrease });
//         }
//         return patch;
//       }).filter(Boolean);

//       // Commit all patches in the batch concurrently
//       await Promise.all(patches.map(p => p.commit()));
//     }

//     console.log(`Investment update complete: ${activeInvestments.length} records processed.`);
//   } catch (err) {
//     console.error("Error updating investments:", err);
//   }
// }

// // ---------------------- CRON SETUP ----------------------
// // Runs every 5 minutes (you can reduce to 1 minute if needed)
// // cron.schedule("*/1 * * * *", async () => {
// //   console.log("CRON Triggered:", new Date().toISOString());
// //   await updateInvestments();
// // });

// // Optional: run immediately on server start
// // updateInvestments();
