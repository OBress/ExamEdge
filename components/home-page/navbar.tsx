"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Check if user is signed in using Supabase
    const checkAuthStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsSignedIn(true);

        // Get user's email or name for the avatar
        // First, try to get user metadata if available
        if (
          user.user_metadata &&
          (user.user_metadata.full_name || user.user_metadata.name)
        ) {
          setUsername(user.user_metadata.full_name || user.user_metadata.name);
        } else if (user.email) {
          // Fall back to email if no name is available
          setUsername(user.email.split("@")[0]);
        } else {
          // Last resort
          setUsername("User");
        }
      }
    };

    checkAuthStatus();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsSignedIn(true);
        const user = session.user;

        if (
          user.user_metadata &&
          (user.user_metadata.full_name || user.user_metadata.name)
        ) {
          setUsername(user.user_metadata.full_name || user.user_metadata.name);
        } else if (user.email) {
          setUsername(user.email.split("@")[0]);
        } else {
          setUsername("User");
        }
      }

      if (event === "SIGNED_OUT") {
        setIsSignedIn(false);
        setUsername("");
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setIsSignedIn(false);
      router.push("/");
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/home-page" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="ExamEdge Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-xl font-bold text-primary">ExamEdge</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/dashboard"
            className="text-base font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="#pricing"
            onClick={scrollToPricing}
            className="text-base font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <ThemeSwitcher />

          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-medium"
                >
                  {username.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          {isSignedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium mr-1"
                >
                  {username.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-background border-b border-border animate-in slide-in-from-top-5">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="flex items-center py-2 text-base hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              onClick={scrollToPricing}
              className="flex items-center py-2 text-base hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            {!isSignedIn && (
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="flex items-center py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button asChild>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
