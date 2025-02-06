"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    twoFactor: false,
    email: "user@example.com",
    password: "",
    language: "english",
    timezone: "UTC",
  });

  const handleChange = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Settings</h2>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={settings.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <Switch
                  id="twoFactor"
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) =>
                    handleChange("twoFactor", checked)
                  }
                />
              </div>
              <Button className="bg-[#3563E9] text-white hover:bg-[#2952cc]">
                Save Account Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) =>
                    handleChange("darkMode", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value: string) => handleChange("language", value)}
                >
                  <SelectTrigger className="w-full bg-gray-700 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value: string) => handleChange("timezone", value)}
                >
                  <SelectTrigger className="w-full bg-gray-700 text-white">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#3563E9] text-white hover:bg-[#2952cc]">
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) =>
                    handleChange("notifications", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-notif" />
                    <label htmlFor="email-notif">Email Notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-notif" />
                    <label htmlFor="push-notif">Push Notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms-notif" />
                    <label htmlFor="sms-notif">SMS Notifications</label>
                  </div>
                </div>
              </div>
              <Button className="bg-[#3563E9] text-white hover:bg-[#2952cc]">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
