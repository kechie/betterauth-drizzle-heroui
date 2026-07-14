"use client";

import { useEffect, useState } from "react";
import { authClient } from "@lib/auth-client";
import { Card, Button, Spinner, Badge } from "@heroui/react";
import { Users, ShieldAlert, ShieldCheck, Ban, UserMinus, UserCheck } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  banned?: boolean;
}

export default function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    // Better Auth built-in API lists users with limit/offset default configurations
    const response = await authClient.admin.listUsers({
      query: { limit: 50 }
    });

    if (response?.data?.users) {
      setUsers(response.data.users as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const handleRoleToggle = async (userId: string, currentRole: string) => {
  //   setActionId(userId);
  //   const newRole = currentRole === "admin" ? "user" : "admin";

  //   await authClient.admin.setRole({
  //     userId,
  //     role: newRole
  //   });

  //   await fetchUsers(); // Refresh the grid
  //   setActionId(null);
  // };
  const handleRoleToggle = async (userId: string, currentRole: string) => {
    setActionId(userId);

    // Rotate between your roles for testing, or wire this up to a select input dropdown!
    let newRole = "user";
    if (currentRole === "user") newRole = "staff";
    else if (currentRole === "staff") newRole = "accounting";
    else if (currentRole === "accounting") newRole = "ceo";
    else if (currentRole === "ceo") newRole = "admin";

    await authClient.admin.setRole({
      userId,
      role: newRole // 👈 Fully accepted now!
    });

    await fetchUsers();
    setActionId(null);
  };
  const handleBanToggle = async (userId: string, isBanned: boolean) => {
    setActionId(userId);

    if (isBanned) {
      await authClient.admin.unbanUser({ userId });
    } else {
      await authClient.admin.banUser({
        userId,
        banReason: "Suspended by Administrator"
      });
    }

    await fetchUsers();
    setActionId(null);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <Card.Header>
          <Card.Title>Managing Directory...</Card.Title>
        </Card.Header>
        <Card.Content className="flex items-center justify-center p-12">
          <Spinner color="primary" />
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-divider bg-content1 shadow-medium">
      <Card.Header className="flex gap-3 pb-4 border-b border-divider">
        <Users className="text-primary" size={24} />
        <div className="flex flex-col">
          <Card.Title className="text-md font-bold text-foreground">
            User Directory & Access Control
          </Card.Title>
          <Card.Description className="text-xs text-default-400">
            Promote user capabilities, revoke access tokens, or suspend accounts on the fly.
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-divider bg-default-50 text-default-500 font-semibold">
              <th className="p-4">User Details</th>
              <th className="p-4">Active Role</th>
              <th className="p-4">Account Status</th>
              <th className="p-4 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-default-400">
                  No users found in database directory.
                </td>
              </tr>
            ) : (
              users.map((item) => (
                <tr key={item.id} className="hover:bg-default-50 transition-colors">
                  {/* User Profile */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{item.name}</span>
                      <span className="text-xs text-default-400">{item.email}</span>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="p-4">
                    <Badge
                      color={item.role === "admin" ? "danger" : "default"}
                      variant="flat"
                    >
                      {item.role.toUpperCase()}
                    </Badge>
                  </td>

                  {/* Status Indicator */}
                  <td className="p-4">
                    {item.banned ? (
                      <span className="flex items-center gap-1.5 text-xs text-danger font-medium">
                        <Ban size={14} /> Suspended
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-success font-medium">
                        <ShieldCheck size={14} /> Active
                      </span>
                    )}
                  </td>

                  {/* Action Controllers */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Toggle Admin Privilege Button */}
                      <Button
                        size="sm"
                        variant="flat"
                        color={item.role === "admin" ? "default" : "warning"}
                        isLoading={actionId === item.id}
                        onClick={() => handleRoleToggle(item.id, item.role)}
                      >
                        {item.role === "admin" ? (
                          <span className="flex items-center gap-1"><UserMinus size={14} /> Demote</span>
                        ) : (
                          <span className="flex items-center gap-1"><ShieldAlert size={14} /> Promote</span>
                        )}
                      </Button>

                      {/* Ban / Unban Toggle Button */}
                      <Button
                        size="sm"
                        variant="flat"
                        color={item.banned ? "success" : "danger"}
                        isLoading={actionId === item.id}
                        onClick={() => handleBanToggle(item.id, !!item.banned)}
                      >
                        {item.banned ? (
                          <span className="flex items-center gap-1"><UserCheck size={14} /> Lift Ban</span>
                        ) : (
                          <span className="flex items-center gap-1"><Ban size={14} /> Suspend</span>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
}
