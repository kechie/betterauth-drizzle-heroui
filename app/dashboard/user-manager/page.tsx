"use client";

import { useEffect, useState } from "react";
import { authClient } from "@lib/auth-client";
import { Card, Button, Spinner, Badge, Form, Input, TextField, Label } from "@heroui/react";
import { Users, ShieldAlert, ShieldCheck, Ban, UserMinus, UserPlus, Trash2, KeyRound, Mail, Calendar } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: string | null;
}

export default function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // Create User Form States
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [createLoading, setCreateLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await authClient.admin.listUsers({
      query: { limit: 50 }
    });

    if (response?.data?.users) {
      // 👈 EXCLUDE SUPERADMIN: Filter out any superadmin rows completely from rendering
      const filtered = response.data.users.filter((u: any) => u.role !== "superadmin");
      setUsers(filtered as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE ACTION
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setErrorMsg(null);

    const { error } = await authClient.admin.createUser({
      email: newEmail,
      password: newPassword,
      name: newName,
      role: newRole,
    });

    if (error) {
      setErrorMsg(error.message || "Failed to create user.");
    } else {
      // Clear inputs on success
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("user");
      await fetchUsers();
    }
    setCreateLoading(false);
  };

  // UPDATE (ROLE) ACTION
  const handleRoleToggle = async (userId: string, currentRole: string) => {
    setActionId(userId);
    let targetedRole = "user";
    if (currentRole === "user") targetedRole = "staff";
    else if (currentRole === "staff") targetedRole = "accounting";
    else if (currentRole === "accounting") targetedRole = "admin";
    else if (currentRole === "admin") targetedRole = "useradmin";

    await authClient.admin.setRole({ userId, role: targetedRole });
    await fetchUsers();
    setActionId(null);
  };

  // UPDATE (BAN/SUSPEND) ACTION
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

  // DELETE ACTION
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you absolutely sure you want to permanently delete this user account?")) return;
    setActionId(userId);
    await authClient.admin.deleteUser({ userId });
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
          <Spinner color="current" />
        </Card.Content>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* 1. CREATE COMPONENT: Admin User Creation Form */}
      <Card className="w-full border border-divider bg-content1 shadow-medium">
        <Card.Header className="flex gap-3 pb-4 border-b border-divider">
          <UserPlus className="text-primary" size={24} />
          <div className="flex flex-col">
            <Card.Title className="text-md font-bold text-foreground">Provision New Account</Card.Title>
            <Card.Description className="text-xs text-default-400">Directly onboard staff or team members with specific workspace privileges.</Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="p-4">
          <Form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <TextField isRequired name="name">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>Email Address</Label>
              <Input placeholder="name@company.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label>Temporary Password</Label>
              <Input placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </TextField>
            <div className="flex gap-2">
              <TextField name="role" className="w-full">
                <Label>Initial Assignment</Label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full h-10 px-3 bg-default-100 border-none rounded-medium text-small text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="accounting">Accounting</option>
                  <option value="useradmin">User Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </TextField>
              <Button type="submit" variant="primary" className="h-10 shrink-0 font-medium" isLoading={createLoading}>
                Add User
              </Button>
            </div>
          </Form>
          {errorMsg && <p className="text-xs text-danger font-medium mt-2">{errorMsg}</p>}
        </Card.Content>
      </Card>

      {/* 2. READ, UPDATE, DELETE COMPONENT: Directory Table */}
      <Card className="w-full border border-divider bg-content1 shadow-medium">
        <Card.Header className="flex gap-3 pb-4 border-b border-divider">
          <Users className="text-primary" size={24} />
          <div className="flex flex-col">
            <Card.Title className="text-md font-bold text-foreground">User Directory & Access Control</Card.Title>
            <Card.Description className="text-xs text-default-400">Full control over live operational directory. System superadmins are protected and excluded.</Card.Description>
          </div>
        </Card.Header>

        <Card.Content className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm min-w-[950px]">
            <thead>
              <tr className="border-b border-divider bg-default-50 text-default-500 font-semibold">
                <th className="p-4">User Details & ID</th>
                <th className="p-4">Role Clearance</th>
                <th className="p-4">Verification</th>
                <th className="p-4">Account Restrictions</th>
                <th className="p-4">Timestamps</th>
                <th className="p-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-default-400">No managed users found in directory registry.</td>
                </tr>
              ) : (
                users.map((item) => (
                  <tr key={item.id} className="hover:bg-default-50/50 transition-colors">

                    {/* User Identity */}
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5 max-w-[220px]">
                        <span className="font-semibold text-foreground truncate">{item.name}</span>
                        <span className="text-xs text-default-400 truncate">{item.email}</span>
                        <span className="text-[10px] font-mono text-default-400 bg-default-100 px-1 py-0.5 rounded w-max mt-1 flex items-center gap-1">
                          <KeyRound size={10} /> {item.id}
                        </span>
                      </div>
                    </td>

                    {/* Role Display */}
                    <td className="p-4">
                      <Badge color={["admin", "useradmin"].includes(item.role) ? "danger" : "default"} variant="flat" className="capitalize">
                        {item.role}
                      </Badge>
                    </td>

                    {/* Verification Tracking */}
                    <td className="p-4">
                      {item.emailVerified ? (
                        <span className="flex items-center gap-1.5 text-xs text-success font-medium"><Mail size={14} /> Verified</span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-default-400 font-medium"><Mail size={14} /> Unverified</span>
                      )}
                    </td>

                    {/* Restriction Status */}
                    <td className="p-4">
                      {item.banned ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1.5 text-xs text-danger font-bold"><Ban size={14} /> Suspended</span>
                          {item.banReason && <span className="text-[11px] text-danger-500 italic max-w-[180px] truncate">Reason: "{item.banReason}"</span>}
                        </div>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-success font-medium"><ShieldCheck size={14} /> Active</span>
                      )}
                    </td>

                    {/* Chronological State */}
                    <td className="p-4">
                      <div className="flex flex-col text-xs text-default-500 gap-1">
                        <span className="flex items-center gap-1 text-[11px]"><Calendar size={12} className="text-default-400" /> Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* CRUD Interceptors (Update & Delete) */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="flat" color="warning" isLoading={actionId === item.id} onClick={() => handleRoleToggle(item.id, item.role)}>
                          Cycle Role
                        </Button>

                        <Button size="sm" variant="flat" color={item.banned ? "success" : "danger"} isLoading={actionId === item.id} onClick={() => handleBanToggle(item.id, !!item.banned)}>
                          {item.banned ? "Lift Ban" : "Suspend"}
                        </Button>

                        <Button size="sm" variant="light" color="danger" isIconOnly isLoading={actionId === item.id} onClick={() => handleDeleteUser(item.id)}>
                          <Trash2 size={16} />
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
    </div>
  );
}
