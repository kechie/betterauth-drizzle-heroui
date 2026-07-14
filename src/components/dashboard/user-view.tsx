// Example layout update within src/components/dashboard/user-view.tsx
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@lib/auth-client"; // Fixed import path from context
import { Card, Button, Spinner } from "@heroui/react";
import { Monitor, Smartphone, ShieldAlert } from "lucide-react";

interface SessionData {
  id: string;
  token: string; // Ensure token is typed cleanly
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
}

export default function SessionManager() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingToken, setRevokingToken] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);

    // 1. Fetch active session list AND the current active session validation info
    const [sessionsResponse, activeSessionResponse] = await Promise.all([
      authClient.listSessions(),
      authClient.getSession()
    ]);

    const allSessions = sessionsResponse.data || [];
    const currentToken = activeSessionResponse.data?.session?.token;

    // 2. Filter out the current browser window session token from the display array
    if (currentToken) {
      const otherSessions = allSessions.filter((s: any) => s.token !== currentToken);
      setSessions(otherSessions as any);
    } else {
      setSessions(allSessions as any);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (token: string) => {
    setRevokingToken(token);
    await authClient.revokeSession({ token });
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
            <Card.Header>
              <Card.Title>Loading active devices...</Card.Title>
            </Card.Header>
            <Card.Content className="flex items-center justify-center p-12">
              <Spinner color="current" />
            </Card.Content>
          </Card>
    );
  }

  return (
    <Card className="w-full border border-divider bg-content1 shadow-medium">
        <Card.Header className="flex gap-3 pb-2 border-b border-divider">
          <ShieldAlert className="text-warning" size={24} />
          <div className="flex flex-col">
            <Card.Title className="text-md font-bold text-foreground">
              Other Active Device Sessions
            </Card.Title>
            <Card.Description className="text-xs text-default-400">
              Manage alternative active application instances except current device.
            </Card.Description>
          </div>
        </Card.Header>

        <Card.Content className="divide-y divide-divider">
          {sessions.length === 0 ? (
            <p className="text-small text-default-400 py-4 text-center">No other active device sessions located.</p>
          ) : (
            sessions.map((session) => (
              <div key={session.token} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                {/* ... item layout stays exactly the same ... */}
              </div>
            ))
          )}
        </Card.Content>
      </Card>
)}
