//TODO: RBAC logic here
// app/dashboard/page.tsx
import { headers } from "next/headers";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import AdminView from "@components/dashboard/admin-view";
import UserView from "@components/dashboard/user-view";

export default async function DashboardPage() {
  // Fetch session data securely from server context
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //console.log(session.user.role);
  if (!session) {
    redirect("/sign-in");
  }
  //ignore lint error below
  const userRole = session?.user.role;
  //console.log(userRole)
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <header className="flex flex-col gap-1 border-b border-divider pb-4">
        <h1 className="text-3xl font-bold text-foreground">Workspace Dashboard</h1>
        <p className="text-small text-default-500">
          Logged in as: <span className="font-semibold text-primary">{session.user.email}</span> ({userRole})
        </p>
      </header>

      {/* Conditionally render views based on the RBAC role */}
      {userRole === "superadmin" ? (
        <AdminView user={session.user} />
      ) : (
        <UserView user={session.user} />
      )}
    </div>
  );
}
