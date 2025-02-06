"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 14000 },
  { name: "Mar", total: 11398 },
  { name: "Apr", total: 13200 },
  { name: "May", total: 12800 },
  { name: "Jun", total: 15231 },
];

interface OverviewProps {
  data: number;
}

export function Overview({ data: totalRevenue }: OverviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalRevenue)}
        </h2>
        <p className="text-sm text-muted-foreground">+20.1% from last month</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#adfa1d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}