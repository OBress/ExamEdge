"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, BarChart, Settings, Users } from "lucide-react";

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("create");

  const features = [
    {
      id: "create",
      title: "Create Exams",
      description:
        "Build comprehensive exams with multiple question types including multiple choice, true/false, matching, and essay questions.",
      icon: FileText,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "time",
      title: "Time Management",
      description:
        "Set time limits for the entire exam or individual sections to simulate real testing conditions.",
      icon: Clock,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "analytics",
      title: "Detailed Analytics",
      description:
        "Track student performance with comprehensive analytics and identify areas for improvement.",
      icon: BarChart,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "customize",
      title: "Customization",
      description:
        "Personalize exams with your branding, custom instructions, and specialized scoring methods.",
      icon: Settings,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "collaborate",
      title: "Collaboration",
      description:
        "Work together with other educators to create and share exam content within your institution.",
      icon: Users,
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  return (
    <div className="mt-12">
      <Tabs
        defaultValue="create"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          {features.map((feature) => (
            <TabsTrigger
              key={feature.id}
              value={feature.id}
              className="flex flex-col items-center gap-2 py-3 data-[state=active]:text-primary"
            >
              <feature.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {features.map((feature) => (
          <TabsContent
            key={feature.id}
            value={feature.id}
            className="mt-4 animate-in fade-in-50 data-[state=active]:animate-in data-[state=active]:fade-in-0"
          >
            <Card>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                          <span>Feature benefit {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
