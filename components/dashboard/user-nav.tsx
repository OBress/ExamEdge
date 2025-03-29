"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function UserNav() {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is signed in using Supabase
    const checkAuthStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsSignedIn(true);
        setUserEmail(user.email || "");

        // Get user's email or name for the avatar
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
        setUserEmail(user.email || "");

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
        setUserEmail("");
      }
    });

    return () => {
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

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setUnreadNotifications(0)}
      >
        <Bell className="h-5 w-5" />
        {unreadNotifications > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {unreadNotifications}
          </span>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium"
          >
            {username ? username.charAt(0).toUpperCase() : "U"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {username || "Guest"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail || "Not signed in"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
