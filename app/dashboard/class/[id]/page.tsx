import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import UnitList from "@/components/dashboard/unit-list";
import { getClassById } from "@/lib/data";

export const metadata: Metadata = {
  title: "Class Details | ExamEdge",
  description: "View and manage units for your class.",
};

interface ClassPageProps {
  params: {
    id: string;
  };
}

export default function ClassPage({ params }: ClassPageProps) {
  const classData = getClassById(params.id);

  if (!classData) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={classData.name}
        text={classData.description}
        backHref="/dashboard"
      />
      <UnitList classId={params.id} />
    </DashboardShell>
  );
}
