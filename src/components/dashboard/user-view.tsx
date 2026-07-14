// Example layout update within src/components/dashboard/user-view.tsx
import { Card, CardHeader } from "@heroui/react";
import SessionManager from "./session-manager";

export default function UserView({ user }: { user: any }) {
  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <Card.Header className="font-bold text-lg">Your Workspace</Card.Header>
        <Card.Content>
          Welcome back! You have standard access permissions.</p>
        </Card.Content>
        <Card.Footer>
          Card Footer
        </Card.Footer>
      </Card>

      {/* Renders right underneath personal workspace overview card safely */}
      <SessionManager />
    </div>
  );
}
