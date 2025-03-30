"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  Scan,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateUnitDialog } from "@/components/dashboard/create-unit";
import { ScanSubmissionDialog } from "@/components/dashboard/scan-submission";
import { HomeworkDropdown } from "@/components/dashboard/hw-dropdown";
import { getClassById } from "@/lib/data";

interface UnitListProps {
  classId: string;
}

export default function UnitList({ classId }: UnitListProps) {
  const classData = getClassById(classId);
  const [units, setUnits] = useState(classData?.units || []);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isScanDialogOpen, setIsScanDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const handleCreateUnit = (newUnit: any) => {
    setUnits([...units, newUnit]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteUnit = (unitId: string) => {
    setUnits(units.filter((unit) => unit.id !== unitId));
  };

  const handleOpenScanDialog = (unitId: string) => {
    setSelectedUnitId(unitId);
    setIsScanDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Units</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Unit
        </Button>
      </div>

      {units.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No Units Yet</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground max-w-md">
              Start by adding your first unit to organize your course content
              and exams.
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create First Unit
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-4">
          {units.map((unit) => (
            <AccordionItem
              key={unit.id}
              value={unit.id}
              className="border rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-2 text-left">
                    <span className="font-medium">{unit.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {unit.topics.length} Topics
                    </span>
                  </div>
                </AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenScanDialog(unit.id);
                    }}
                  >
                    <Scan className="h-4 w-4" />
                    <span>Scan</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit Unit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onClick={() => handleDeleteUnit(unit.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Unit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <AccordionContent className="pb-4 pt-0">
                <div className="px-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {unit.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Topics</h4>
                    {unit.topics.length > 0 ? (
                      <ul className="space-y-1">
                        {unit.topics.map((topic, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              {topic}
                            </div>
                            <HomeworkDropdown
                              unitId={unit.id}
                              topicId={index.toString()}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No topics added yet.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Add Topic
                    </Button>
                    <Button size="sm">Create Exam</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <CreateUnitDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateUnit={handleCreateUnit}
        classId={classId}
      />

      <ScanSubmissionDialog
        open={isScanDialogOpen}
        onOpenChange={setIsScanDialogOpen}
        unitId={selectedUnitId}
      />
    </div>
  );
}
