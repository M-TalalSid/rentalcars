"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SubscriptionsProps {
  data: {
    total: number;
    percentage: number;
    data: Array<{ name: string; total: number }>;
  };
}

export function Subscriptions({ data }: SubscriptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold">+{data.total}</h2>
        <p className="text-sm text-muted-foreground">
          +{data.percentage}% from last month
        </p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.data}>
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
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}