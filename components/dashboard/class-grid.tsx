"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateClassDialog } from "@/components/dashboard/create-class";
import { getClasses } from "@/lib/data";

export default function ClassGrid() {
  const [classes, setClasses] = useState(getClasses());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateClass = (newClass: any) => {
    setClasses([...classes, newClass]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{classItem.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {classItem.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-1 -mr-2">
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit Class
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{classItem.units.length} Units</span>
                <span>•</span>
                <span>{classItem.totalExams} Exams</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full">
                <Link href={`/dashboard/class/${classItem.id}`}>
                  View Class
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card className="flex h-full min-h-[200px] flex-col items-center justify-center border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Create New Class</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Add a new class to organize your exams and units
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create Class
            </Button>
          </CardContent>
        </Card>
      </div>

      <CreateClassDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateClass={handleCreateClass}
      />
    </div>
  );
}
