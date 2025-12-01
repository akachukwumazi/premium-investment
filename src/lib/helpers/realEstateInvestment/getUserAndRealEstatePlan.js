import { client } from "@/lib/sanity";

export async function getUserAndRealEstatePlan(userId, planId) {
  const [user, plan] = await Promise.all([
    client.fetch(
      `*[_type=="user" && _id==$userId][0]{_id, accountBalance, name, email}`,
      { userId }
    ),
    client.fetch(
      `*[_type=="realEstatePlan" && _id==$planId && status=="active"][0]{
        _id, title, roiEstimate, investmentPeriod, minInvestment
      }`,
      { planId }
    ),
  ]);

  if (!user) return { success: false, message: "User not found", status: 404 };
  if (!plan)
    return {
      success: false,
      message: "Real Estate plan not found",
      status: 404,
    };

  return {
    success: true,
    message: "User and plan fetched successfully",
    status: 200,
    data: { user, plan },
  };
}
