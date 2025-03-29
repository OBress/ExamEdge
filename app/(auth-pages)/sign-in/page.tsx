import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { OrDivider } from "@/components/or-divider";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Sign In | ExamEdge",
  description: "Sign in to your ExamEdge account.",
};

export default async function SignInPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  // Get the redirect URL from query params, defaulting to "/dashboard"
  const redirectTo =
    "searchParams" in searchParams &&
    typeof searchParams === "object" &&
    "redirectTo" in searchParams
      ? (searchParams.redirectTo as string)
      : "/";

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="w-full flex h-16 items-center px-4 md:px-6">
        <div className="container mx-auto">
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
      </header>
      <main className="flex flex-1 w-full">
        <div className="container mx-auto flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-md space-y-6 px-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your ExamEdge account
              </p>
            </div>

            {/* Sign-in form */}
            <div className="flex flex-col gap-4">
              <GoogleAuthButton text="Sign in with Google" />
              <OrDivider />
              <form className="flex flex-col gap-3">
                <input type="hidden" name="redirectTo" value={redirectTo} />
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      className="text-xs text-foreground underline"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    required
                  />
                </div>
                <SubmitButton
                  pendingText="Signing In..."
                  formAction={signInAction}
                >
                  Sign in
                </SubmitButton>
                <FormMessage message={searchParams} />
              </form>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
