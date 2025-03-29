import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FeatureShowcase from "@/components/home-page/showcase";
import ReviewSlider from "@/components/home-page/review-slider";
import PricingSection from "@/components/home-page/pricing-section";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Introducing ExamEdge
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Practice Exams with Ease
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                ExamEdge helps educators and trainers create, manage, and
                distribute practice exams that prepare students for success.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="ExamEdge Dashboard Preview"
                  fill
                  className="object-contain rounded-lg shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="demo" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-sm text-secondary-foreground">
                Powerful Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See ExamEdge in Action
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create comprehensive practice exams with our intuitive
                interface. Add questions, set time limits, and track student
                progress.
              </p>
            </div>
          </div>
          <FeatureShowcase />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-secondary/5 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of educators who trust ExamEdge for their exam
                preparation needs.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <ReviewSlider />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for you and your students.
              </p>
            </div>
          </div>
          <PricingSection />
        </div>
      </section>
    </>
  );
}
