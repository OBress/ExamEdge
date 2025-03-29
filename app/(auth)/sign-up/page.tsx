import { signUpAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FormMessage, Message } from "@/components/form-message";
import { SmtpMessage } from "../smtp-message";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { OrDivider } from "@/components/or-divider";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Sign Up | ExamEdge",
  description:
    "Create an account on ExamEdge to start creating practice exams.",
};

export default async function SignUpPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="ExamEdge Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-xl font-bold text-primary">ExamEdge</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        <div className="mx-auto w-full max-w-md gap-6 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">
              Enter your information to get started with ExamEdge
            </p>
          </div>

          {/* Sign-up form */}
          <div className="flex flex-col gap-4">
            <GoogleAuthButton text="Sign up with Google" />
            <OrDivider />
            <form className="flex flex-col gap-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                />
              </div>
              <SubmitButton
                pendingText="Signing up..."
                formAction={signUpAction}
              >
                Sign up
              </SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <SmtpMessage />
    </div>
  );
}
