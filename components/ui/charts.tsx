"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  [key: string]: unknown; // For additional properties
}

interface LineChartProps {
  data: ChartData[];
  xKey: string;
  lineKey: string;
  color?: string;
}

interface BarChartProps {
  data: ChartData[];
  xKey: string;
  barKey: string;
  color?: string;
}

interface PieChartProps {
  data: ChartData[];
  dataKey: string;
  colors?: string[];
}

export const CustomLineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  lineKey,
  color = "#8884d8",
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={lineKey} stroke={color} />
    </LineChart>
  </ResponsiveContainer>
);

export const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  barKey,
  color = "#82ca9d",
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={barKey} fill={color} />
    </BarChart>
  </ResponsiveContainer>
);

export const CustomPieChart: React.FC<PieChartProps> = ({
  data,
  dataKey,
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Tooltip />
      <Pie data={data} dataKey={dataKey} outerRadius={100} fill="#8884d8" label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);