"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Progress from "@/components/ui/progress";

interface CookieSettingsProps {
  data: {
    necessary: number;
    functional: number;
    analytics: number;
  };
}

export function CookieSettings({ data }: CookieSettingsProps) {
  const [strictlyNecessary, setStrictlyNecessary] = React.useState(true);
  const [functional, setFunctional] = React.useState(false);
  const [performance, setPerformance] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Manage your cookie settings here.
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="strictly-necessary"
            >
              Strictly Necessary
            </label>
            <p className="text-sm text-muted-foreground">
              These cookies are essential in order to use the website and use
              its features.
            </p>
          </div>
          <Switch
            id="strictly-necessary"
            checked={strictlyNecessary}
            onCheckedChange={setStrictlyNecessary}
            disabled
          />
        </div>
        <Progress value={data.necessary} className="h-2" />
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="functional"
            >
              Functional Cookies
            </label>
            <p className="text-sm text-muted-foreground">
              These cookies allow the website to provide personalized
              functionality.
            </p>
          </div>
          <Switch
            id="functional"
            checked={functional}
            onCheckedChange={setFunctional}
          />
        </div>
        <Progress value={data.functional} className="h-2" />
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="performance"
            >
              Analytics Cookies
            </label>
            <p className="text-sm text-muted-foreground">
              These cookies help to improve the performance of the website.
            </p>
          </div>
          <Switch
            id="performance"
            checked={performance}
            onCheckedChange={setPerformance}
          />
        </div>
        <Progress value={data.analytics} className="h-2" />
      </div>
      <Button className="w-full">Save preferences</Button>
    </div>
  );
}
