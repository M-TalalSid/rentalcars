"use client";
import { Suspense, useEffect, useState } from "react";
import { Overview } from "./components/overview";
import { Subscriptions } from "./components/subscriptions";
import { TeamMembers } from "./components/team-members";
import { CookieSettings } from "./components/cookie-settings";
import { CreateAccount } from "./components/create-account";
import { Payments } from "./components/payments";
import { PaymentMethod } from "./components/payment-method";
import { Analytics } from "./components/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
}
interface DashboardData {
  totalRevenue: number;
  subscriptions: {
    total: number;
    percentage: number;
    data: Array<{ name: string; total: number }>;
  };
  cookieConsent: {
    necessary: number;
    functional: number;
    analytics: number;
  };
  analytics: {
    daily: Array<{ date: string; sales: number; visitors: number }>;
    weekly: Array<{ date: string; sales: number; visitors: number }>;
    monthly: Array<{ date: string; sales: number; visitors: number }>;
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  if (!dashboardData) {
    return <div>Error Loading Dashboard Data</div>;
  }

  return (
    <div className="flex flex-col  gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 bg-gray-700">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
              <Overview data={dashboardData.totalRevenue} />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-2 bg-gray-700">
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
              <Subscriptions data={dashboardData.subscriptions} />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-700">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMembers />
          </CardContent>
        </Card>

        <Card className="bg-gray-700">
          <CardHeader>
            <CardTitle>Cookie Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <CookieSettings data={dashboardData.cookieConsent} />
          </CardContent>
        </Card>

        <Card className="bg-gray-700">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateAccount />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-700">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <Payments />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="bg-gray-700">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentMethod />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
            <Analytics data={dashboardData.analytics} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}