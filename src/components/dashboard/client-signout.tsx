"use client";

import { authClient } from "@lib/auth-client";
import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";

export default function ClientSignOut() {
  return (
    <Button
      size="sm"
      variant="light"
      color="danger"
      className="gap-2 text-xs font-medium"
      onClick={async () => {
        await authClient.signOut({
          callbackURL: "/sign-in",
        });
      }}
    >
      <LogOut size={14} />
      Sign Out
    </Button>
  );
}
