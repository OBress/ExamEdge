import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import SettingsTabs from "@/components/dashboard/settings/settings-tabs";

export const metadata: Metadata = {
  title: "Settings | ExamEdge",
  description: "Manage your account settings and preferences.",
};

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />
      <SettingsTabs />
    </DashboardShell>
  );
}
