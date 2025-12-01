import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export default async function autoCompleteHandler() {
  try {
    const now = new Date().toISOString();

    // Fetch active investments that should be completed
    const activeInvestments = await client.fetch(
      `*[_type=="userInvestment" && status=="active" && endDate <= $now && planType in ["crypto","realEstate","stockBond"]]{
        _id,
        amount,
        unitsHeld,
        planType,
        plan
      }`,
      { now }
    );

    for (const inv of activeInvestments) {
      let plan;
      let profit = 0;

      if (inv.planType === "crypto") {
        plan = await client.fetch(
          `*[_type=="cryptoPlan" && _id==$planId][0]{profitPercent}`,
          { planId: inv.plan._ref }
        );
        profit = (inv.amount * plan.profitPercent) / 100;
      } else if (inv.planType === "realEstate") {
        plan = await client.fetch(
          `*[_type=="realEstatePlan" && _id==$planId][0]{roiEstimate}`,
          { planId: inv.plan._ref }
        );
        profit = (inv.amount * plan.roiEstimate) / 100;
      } else if (inv.planType === "stockBond") {
        plan = await client.fetch(
          `*[_type=="stockBondPlan" && _id==$planId][0]{changePercent}`,
          { planId: inv.plan._ref }
        );
        profit = (inv.unitsHeld * plan.changePercent) || 0;
      }

      // Mark investment as completed
      await client.patch(inv._id)
        .set({
          status: "completed",
          profit,
          updatedAt: new Date().toISOString(),
        })
        .commit();
    }

    return NextResponse.json(
      { message: `${activeInvestments.length} investments auto-completed.` },
      { status: 200 }
    );

  } catch (err) {
    console.error("AUTO_COMPLETE_ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}

export const POST = autoCompleteHandler;
