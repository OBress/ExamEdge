"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, Plus } from "lucide-react";
import { getHomeworksByTopicId } from "@/lib/data";

interface HomeworkDropdownProps {
  unitId: string;
  topicId: string;
}

export function HomeworkDropdown({ unitId, topicId }: HomeworkDropdownProps) {
  const [homeworks, setHomeworks] = useState(
    getHomeworksByTopicId(unitId, topicId)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1">
          <span className="text-xs">Homeworks</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Related Homeworks</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {homeworks.length > 0 ? (
          homeworks.map((homework) => (
            <DropdownMenuItem
              key={homework.id}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{homework.title}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(homework.dueDate).toLocaleDateString()}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled className="text-muted-foreground">
            No homeworks yet
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Add Homework</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
