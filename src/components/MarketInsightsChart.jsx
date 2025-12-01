"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", roi: 0 },
  { month: "Feb", roi: 30 },
  { month: "Mar", roi: 0 },
  { month: "Apr", roi: 40 },
  { month: "May", roi: 30 },
  { month: "Jun", roi: 45 },
];

export default function MarketInsightsChart() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm w-full h-[60vh] md:h-full">
      <h2 className="text-lg font-semibold mb-2">Market Insights</h2>
      <p className="text-sm text-gray-500 mb-4">Average ROI Trends</p>

      <div className="h-[80%]  ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} />
            <YAxis tick={{ fill: "#888" }} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="roi" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
