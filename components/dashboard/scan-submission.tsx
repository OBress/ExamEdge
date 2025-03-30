"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, FileUp, Upload, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  textContent: z.string().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `File size should be less than 5MB`
    ),
});

interface ScanSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitId: string | null;
}

export function ScanSubmissionDialog({
  open,
  onOpenChange,
  unitId,
}: ScanSubmissionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      textContent: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    form.setValue("file", file);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    form.setValue("file", undefined);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (activeTab !== "text" && !selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log({
        unitId,
        ...values,
        submissionType: activeTab,
        file: selectedFile,
      });

      toast({
        title: "Submission successful",
        description: "Your content has been uploaded successfully.",
      });

      // Reset form
      form.reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Scan Submission</DialogTitle>
          <DialogDescription>
            Upload text, images, or documents for this unit.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title for this submission"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a description for this submission"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="image"
                    className="flex items-center gap-2"
                  >
                    <Image className="h-4 w-4" />
                    <span>Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="pdf" className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    <span>PDF</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-4">
                  <FormField
                    control={form.control}
                    name="textContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter or paste your text content here"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="image" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 relative">
                      {selectedFile && activeTab === "image" ? (
                        <div className="relative w-full">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 z-10 rounded-full bg-destructive text-destructive-foreground h-6 w-6"
                            onClick={clearFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {previewUrl && (
                            <div className="flex justify-center">
                              <img
                                src={previewUrl || "/placeholder.svg"}
                                alt="Preview"
                                className="max-h-[200px] max-w-full object-contain rounded-lg"
                              />
                            </div>
                          )}
                          <p className="text-sm text-center mt-2">
                            {selectedFile.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop an image, or click to browse
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <label>
                              Browse Files
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </Button>
                        </>
                      )}
                    </div>
                    <FormDescription>
                      Supported formats: JPG, PNG, GIF. Maximum file size: 5MB.
                    </FormDescription>
                  </div>
                </TabsContent>

                <TabsContent value="pdf" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 relative">
                      {selectedFile && activeTab === "pdf" ? (
                        <div className="relative w-full">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 z-10 rounded-full bg-destructive text-destructive-foreground h-6 w-6"
                            onClick={clearFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center justify-center">
                            <FileUp className="h-10 w-10 text-primary" />
                          </div>
                          <p className="text-sm text-center mt-2">
                            {selectedFile.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop a PDF, or click to browse
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <label>
                              Browse Files
                              <Input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </Button>
                        </>
                      )}
                    </div>
                    <FormDescription>
                      Only PDF files are supported. Maximum file size: 5MB.
                    </FormDescription>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
