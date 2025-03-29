import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SmtpMessage } from "../smtp-message";

export const metadata: Metadata = {
  title: "Forgot Password | ExamEdge",
  description: "Reset your ExamEdge password.",
};

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

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
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto grid w-full max-w-md gap-6 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>
            <SubmitButton formAction={forgotPasswordAction}>
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>

          <div className="text-center text-sm">
            Remember your password?{" "}
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
