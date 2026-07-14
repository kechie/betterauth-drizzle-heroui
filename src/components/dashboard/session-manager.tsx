"use client";

import { useEffect, useState } from "react";
import { authClient } from "@lib/auth-client";
import { Card, CardHeader,  Button, Spinner } from "@heroui/react";
import { Monitor, Smartphone, ShieldAlert } from "lucide-react";

interface SessionData {
  id: string;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
}

export default function SessionManager() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingToken, setRevokingToken] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    // Better Auth native client method to retrieve all active sessions for current user
    const { data } = await authClient.listSessions();
    console.log(data);
    if (data) setSessions(data as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (token: string) => {
    console.log("revoking", token)
    setRevokingToken(token);
    // Terminate specific login token cleanly from the DB
    await authClient.revokeSession({ token });
    // Refresh listing
    await fetchSessions();
    setRevokingToken(null);
  };

  const getDeviceIcon = (ua: string | null) => {
    if (!ua) return <Monitor size={20} />;
    const lower = ua.toLowerCase();
    if (lower.includes("mobi") || lower.includes("android") || lower.includes("iphone")) {
      return <Smartphone size={20} className="text-default-500" />;
    }
    return <Monitor size={20} className="text-default-500" />;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <Card.Title>Loading active devices...</Card.Title>
        <Card.Content className="flex items-center justify-center p-12">
          <Spinner variant="primary" />
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-divider">
      <CardHeader className="flex gap-3 pb-2">
        <ShieldAlert className="text-warning" size={24} />
        <div className="flex flex-col">
          <p className="text-md font-bold text-foreground">Active Device Sessions</p>
          <p className="text-xs text-default-400">Manage the applications and devices currently logged into your account.</p>
        </div>
      </CardHeader>

      <Card.Content className="divide-y divide-divider">
        {sessions.length === 0 ? (
          <p className="text-small text-default-400 py-4">No active sessions located.</p>
        ) : (
          sessions.map((session) => (
            <div key={session.token} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-default-100 rounded-lg border border-divider">
                  {getDeviceIcon(session.userAgent)}
                </div>
                <div className="flex flex-col">
                  <span className="text-small font-semibold text-foreground truncate max-w-xs md:max-w-md">
                    {session.userAgent || "Unknown Application/Device"}
                  </span>
                  <span className="text-xs text-default-400">
                    IP: {session.ipAddress || "Unknown"} • Logged in: {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                variant="danger"
                size="sm"
                isLoading={revokingToken === session.token}
                onClick={() => handleRevoke(session.token)}
              >
                Sign Out
              </Button>
            </div>
          ))
        )}
      </Card.Content>
    </Card>
  );
}
