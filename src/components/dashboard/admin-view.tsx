//import { useSession } from "@better-auth/react";
import SessionManager from "./session-manager";
import { Card, CardHeader,Button } from "@heroui/react";

import Link from "next/link";

export default function AdminView({ user }: { user: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="font-bold text-lg">Administrative Console</CardHeader>
        <Card.Content className="space-y-4">
          <p className="text-default-600 text-sm">Full read/write permissions are active for your profile.</p>
          <div className="flex gap-2">
            <Button variant="danger" >Flush System Cache</Button>
            <Button variant="primary"><Link href="/dashboard/user-manager">Manage User Registrations</Link></Button>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <CardHeader className="font-bold">System Status</CardHeader>
        <Card.Content>
          <div className="text-2xl font-black text-success">99.98% Up</div>
          <p className="text-xs text-default-400">Database node replication functional.</p>
        </Card.Content>
      </Card>
      <SessionManager />
    </div>
  );
}
