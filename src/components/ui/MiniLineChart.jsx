"use client";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { value: 10 },
  { value: 20 },
  { value: 15 },
  { value: 30 },
  { value: 25 },
  { value: 40 },
];

export default function MiniLineChart({ color = "#3b82f6" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-12 "
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
