"use client";

import { Tabs, Card } from "@heroui/react";
import { LayoutDashboard, ShieldCheck, UserCheck, Receipt } from "lucide-react";
import SessionManager from "./session-manager";

interface UserViewProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function UserView({ user }: UserViewProps) {
  const role = user.role;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 1. Organize views into tab collections matching the user experience */}
      <Tabs
        defaultSelectedKey="tab-1"
        className="w-full"
        aria-label="User Workspace Navigation"
        //color="primary"
        //variant="underlined"
        // classNames={{
        //   tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
        //   cursor: "w-full bg-primary",
        //   tab: "max-w-fit px-0 h-12 text-medium",
        // }}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Showcase submenu" variant="primary">
            <Tabs.Tab id="tab-1">Account Overview <Tabs.Indicator /></Tabs.Tab>
            <Tabs.Tab id="tab-2">Active Sessions<Tabs.Indicator /></Tabs.Tab>
            <Tabs.Tab id="tab-3">System Logs <Tabs.Indicator /></Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        {/* TAB 1: Main Operational Role View */}
        <Tabs.Panel id="tab-1" className="mt-4 p-4 rounded-xl bg-default-50 border border-default-100 text-small text-default-500"
          key="workspace"
          title={
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <span className="capitalize">{role} Dashboard</span>
            </div>
          }
        >
          <div className="pt-4">
            <Card className="w-full border border-divider bg-content1 shadow-medium">
              <Card.Header>
                <Card.Title className="text-lg font-bold capitalize">
                  Overview System Logins
                </Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <p className="text-default-600 text-sm">
                  Welcome back, <span className="font-semibold text-foreground">{user.name}</span>.
                  You are viewing active modules authorized for your organizational department clearance.
                </p>

                {/* Render specific metrics targeted purely for accounting profiles */}
                {role === "accounting" && (
                  <div className="p-4 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-900 rounded-xl text-sm flex gap-3 items-start">
                    <Receipt className="mt-0.5 shrink-0" size={18} />
                    <div>
                      <span className="font-bold block mb-1">Accounting Desk Modules Active</span>
                      Company ledger registers, balance summaries, and invoicing profiles are loaded down below.
                    </div>
                  </div>
                )}

                {/* Render specific workflow metrics targeted purely for general staff */}
                {role === "staff" && (
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-950/30 text-secondary-700 dark:text-secondary-400 border border-secondary-200 dark:border-secondary-900 rounded-xl text-sm flex gap-3 items-start">
                    <UserCheck className="mt-0.5 shrink-0" size={18} />
                    <div>
                      <span className="font-bold block mb-1">Staff Workstations Enabled</span>
                      Operational task boards, timecards, project status lists, and internal team tickets are ready.
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
        </Tabs.Panel>

        {/* TAB 2: Clean Security & Device Management Profile Isolation */}
        <Tabs.Panel id="tab-2"
          key="security"
          title={<ShieldCheck size={18} />}
        >
          <div className="pt-4">
            {/* Session Management component is isolated cleanly right here */}
            <SessionManager />
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
