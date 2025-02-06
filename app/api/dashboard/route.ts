import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from your database
  const dashboardData = {
    totalRevenue: 95345.67,
    subscriptions: {
      total: 2350,
      percentage: 180.1,
      data: [
        { name: "Jan", total: 1800 },
        { name: "Feb", total: 2200 },
        { name: "Mar", total: 2400 },
        { name: "Apr", total: 2600 },
        { name: "May", total: 2800 },
        { name: "Jun", total: 2350 },
      ],
    },
    cookieConsent: {
      necessary: 100,
      functional: 85,
      analytics: 65,
    },
    analytics: {
      daily: [
        { date: "2024-01-01", sales: 145, visitors: 450 },
        { date: "2024-01-02", sales: 232, visitors: 555 },
        { date: "2024-01-03", sales: 186, visitors: 486 },
        { date: "2024-01-04", sales: 332, visitors: 699 },
        { date: "2024-01-05", sales: 245, visitors: 650 },
        { date: "2024-01-06", sales: 344, visitors: 793 },
        { date: "2024-01-07", sales: 257, visitors: 551 },
      ],
      weekly: [
        { date: "Week 1", sales: 1245, visitors: 3450 },
        { date: "Week 2", sales: 1432, visitors: 3855 },
        { date: "Week 3", sales: 1786, visitors: 4286 },
        { date: "Week 4", sales: 1932, visitors: 4699 },
      ],
      monthly: [
        { date: "Jan", sales: 5245, visitors: 12450 },
        { date: "Feb", sales: 6232, visitors: 14555 },
        { date: "Mar", sales: 4986, visitors: 11486 },
        { date: "Apr", sales: 7332, visitors: 16699 },
        { date: "May", sales: 6245, visitors: 15650 },
        { date: "Jun", sales: 7344, visitors: 17793 },
      ],
    },
  }

  return NextResponse.json(dashboardData)
}

