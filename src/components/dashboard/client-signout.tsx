"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@lib/auth-client";
import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";

export default function ClientSignOut() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="ghost"
      className="gap-2 text-xs font-medium"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in");
            },
            next: {
              revalidate: 0,
            },
          },
        });
      }}
    >
      <LogOut size={14} />
      Sign Out
    </Button>
  );
}
