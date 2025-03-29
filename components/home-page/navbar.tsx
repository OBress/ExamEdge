"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="#pricing"
            onClick={scrollToPricing}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/settings"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Settings
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
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
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-background border-b border-border animate-in slide-in-from-top-5">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="flex items-center py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              onClick={scrollToPricing}
              className="flex items-center py-2 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/settings"
              className="flex items-center py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
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
          </div>
        </div>
      )}
    </header>
  );
}
