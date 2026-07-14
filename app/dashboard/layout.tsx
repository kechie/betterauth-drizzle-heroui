import { headers } from "next/headers";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import SidebarNav from "@components/dashboard/sidebar-nav";
import { Card } from "@heroui/react";
import { ShieldCheck, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Validate session on the server side first
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;
  const isAdminGroup = ["superadmin", "admin", "useradmin"].includes(user.role);

  return (
    <div className="flex min-h-screen bg-default-50/50 dark:bg-background">
      {/* SIDEBAR CONTAINER */}
      <aside className="w-64 border-r border-divider bg-content1 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-6">
          {/* Platform Identity */}
          <div className="flex items-center gap-2 px-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">HQ Management</h2>
              <span className="text-[10px] text-default-400 font-medium tracking-wider uppercase">
                Console Console
              </span>
            </div>
          </div>

          {/* Nav Links Links*/}
          <SidebarNav isAdmin={isAdminGroup} />
        </div>

        {/* User Footnote Profile Summary */}
        <div className="border-t border-divider pt-4 flex flex-col gap-2">
          <div className="flex flex-col px-2">
            <span className="text-xs font-semibold text-foreground truncate">{user.name}</span>
            <span className="text-[10px] text-default-400 truncate capitalize">{user.role}</span>
          </div>
        </div>
      </aside>

      {/* VIEWPORT CONTROLLER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* GLOBAL SCREEN HEADER */}
        <header className="h-16 border-b border-divider bg-content1 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <BadgeClearance role={user.role} />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-default-400 font-mono hidden sm:inline-block">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </header>

        {/* MAIN DATA STREAM PANEL */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// Sub-component to clean up the workspace role visibility indicator badge
function BadgeClearance({ role }: { role: string }) {
  const isHighClearance = ["superadmin", "admin"].includes(role);
  return (
    <span
      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
        isHighClearance
          ? "bg-danger-50 text-danger-600 border-danger-200 dark:bg-danger-950/20 dark:text-danger-400 dark:border-danger-900"
          : "bg-warning-50 text-warning-600 border-warning-200 dark:bg-warning-950/20 dark:text-warning-400 dark:border-warning-900"
      }`}
    >
      {role} Mode Enabled
    </span>
  );
}

// Client-interactive wrapper component for the global layout signout handling
import ClientSignOut from "@components/dashboard/client-signout";
function SignOutButton() {
  return <ClientSignOut />;
}
