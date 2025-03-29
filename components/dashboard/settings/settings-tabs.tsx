"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/dashboard/settings/profile-settings";
import AccountSettings from "@/components/dashboard/settings/account-settings";
import AppearanceSettings from "@/components/dashboard/settings/appearance-settings";
import SecuritySettings from "@/components/dashboard/settings/security-settings";

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-6"
    >
      <TabsList className="grid w-full grid-cols-4 gap-0">
        <TabsTrigger value="profile" className="flex-1">
          Profile
        </TabsTrigger>
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex-1">
          Appearance
        </TabsTrigger>
        <TabsTrigger value="security" className="flex-1">
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="appearance" className="space-y-6">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  );
}
