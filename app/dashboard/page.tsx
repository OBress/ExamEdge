import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import ClassGrid from "@/components/dashboard/class-grid";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard | ExamEdge",
  description: "Manage your classes and exams with ExamEdge.",
};

export default async function DashboardPage() {
  // Create Supabase server client
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session exists, redirect to sign-up page
  if (!session) {
    redirect("/sign-up");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Classes"
        text="Create and manage your classes and their units."
      />
      <ClassGrid />
    </DashboardShell>
  );
}
