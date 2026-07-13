"use client";

import { useState } from "react";
import { Button, Card, Input, TextField, Tabs, Spinner, Alert } from "@heroui/react";
import { ThemeSwitcher } from "@components/theme-switcher";
import {
  Sparkles, Mail, Lock, CheckCircle2, AlertTriangle,
  Info, ShieldAlert, LayoutGrid, Type, ToggleLeft, Activity
} from "lucide-react";

export default function ThemeShowcasePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 bg-background text-foreground">
      {/* 1. Interactive Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">HeroUI v3 Theme Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-default-400 font-mono bg-default-50 px-2 py-1 rounded-md border border-default-100">
            Tailwind v4 Active
          </span>
          <ThemeSwitcher />
        </div>
      </header>

      {/* 2. Page Title */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col gap-12">
        <section className="flex flex-col gap-2 border-b border-default-100 pb-6">
          <h1 className="text-4xl font-black tracking-tight">Design Token Canvas</h1>
          <p className="text-default-500 max-w-2xl">
            Preview how global styling states, variable scaling modifiers, and semantic color rings map dynamically across light and dark theme matrices.
          </p>
        </section>

        {/* 3. Component Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Section: Actions & Buttons */}
          <Card className="p-6 border border-default-100 shadow-sm flex flex-col gap-6">
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <ToggleLeft className="h-5 w-5" />
                <Card.Title className="text-xl">Buttons & Actions</Card.Title>
              </div>
              <Card.Description className="text-xs text-default-400">
                Testing fill variants, borders, and interaction states.
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">Semantic Colors</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">Visual Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Solid</Button>
                  <Button variant="primary">Flat</Button>
                  <Button variant="primary">Bordered</Button>
                  <Button variant="primary">Shadow</Button>
                  <Button variant="primary">Ghost</Button>
{/*                   <Button color="primary" variant="solid">Solid</Button>
                  <Button color="primary" variant="flat">Flat</Button>
                  <Button color="primary" variant="bordered">Bordered</Button>
                  <Button color="primary" variant="shadow">Shadow</Button>
                  <Button color="primary" variant="ghost">Ghost</Button>
 */}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">Sizing & States</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button color="secondary" size="sm">Small</Button>
                  <Button color="secondary" size="md">Medium</Button>
                  <Button color="secondary" size="lg">Large</Button>
                  <Button color="primary" isLoading>Loading State</Button>
                  <Button isDisabled>Disabled</Button>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Section: Forms & Context Fields */}
          <Card className="p-6 border border-default-100 shadow-sm flex flex-col gap-6">
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <Type className="h-5 w-5" />
                <Card.Title className="text-xl">Data Entry (TextField)</Card.Title>
              </div>
              <Card.Description className="text-xs text-default-400">
                Evaluating input enclosures using v3 decoupled layouts.
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-5">
              <TextField aria-label="Standard Outside E-mail" labelPlacement="outside" isRequired={true} className="w-full flex flex-col gap-1.5">
                <div className="relative flex items-center">
                  <Input
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onValueChange={setEmail}
                    className="pl-8 w-full"
                  />
                  <div className="absolute left-3 pointer-events-none"><Mail className="h-4 w-4 text-default-400" /></div>
                </div>
              </TextField>

              <TextField aria-label="Secure Password Layout" labelPlacement="outside" isRequired={true} className="w-full flex flex-col gap-1.5">
                <div className="relative flex items-center">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onValueChange={setPassword}
                    className="pl-8 w-full"
                  />
                  <div className="absolute left-3 pointer-events-none"><Lock className="h-4 w-4 text-default-400" /></div>
                </div>
              </TextField>

              <div className="grid grid-cols-2 gap-4">
                <TextField aria-label="Flat Treatment" labelPlacement="outside" className="flex flex-col gap-1.5">
                  <Input variant="flat" placeholder="Flat text style" />
                </TextField>
                <TextField aria-label="Underlined Treatment" labelPlacement="outside" className="flex flex-col gap-1.5">
                  <Input variant="underlined" placeholder="Underlined style" />
                </TextField>
              </div>
            </Card.Content>
          </Card>

          {/* Section: Feedback & Notifications */}
          <Card className="p-6 border border-default-100 shadow-sm lg:col-span-2 flex flex-col gap-6">
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
              <div className="flex items-center gap-2 text-success font-bold">
                <Activity className="h-5 w-5" />
                <Card.Title className="text-xl">Feedback & System Status</Card.Title>
              </div>
              <Card.Description className="text-xs text-default-400">
                Checking semantic colors inside feedback alert boxes.
              </Card.Description>
            </Card.Header>
            <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert
                color="success"
                variant="flat"
                title="Database sync complete. All table schemas have compiled successfully."
                startContent={<CheckCircle2 className="h-5 w-5" />}
              />
              <Alert
                color="warning"
                variant="flat"
                title="Active session verification is approaching cookie expiration window."
                startContent={<AlertTriangle className="h-5 w-5" />}
              />
              <Alert
                color="danger"
                variant="flat"
                title="Authentication failure: The provided callback payload token is invalid."
                startContent={<ShieldAlert className="h-5 w-5" />}
              />
              <Alert
                color="info"
                variant="flat"
                title="System updates: Running on React 19 architecture with micro-interactions."
                startContent={<Info className="h-5 w-5" />}
              />
            </Card.Content>
          </Card>

          {/* Section: Layout Architecture Primitives */}
          <Card className="p-6 border border-default-100 shadow-sm lg:col-span-2 flex flex-col gap-6">
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
              <div className="flex items-center gap-2 text-warning font-bold">
                <LayoutGrid className="h-5 w-5" />
                <Card.Title className="text-xl">Navigation Layout Primitives</Card.Title>
              </div>
              <Card.Description className="text-xs text-default-400">
                Reviewing decoupled v3 dynamic tabs container logic.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Tabs defaultSelectedKey="tab-1" className="w-full">
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Showcase submenu" variant="primary">
                    <Tabs.Tab id="tab-1">Account Overview <Tabs.Indicator /></Tabs.Tab>
                    <Tabs.Tab id="tab-2">Security Audits <Tabs.Indicator /></Tabs.Tab>
                    <Tabs.Tab id="tab-3">System Logs <Tabs.Indicator /></Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel id="tab-1" className="mt-4 p-4 rounded-xl bg-default-50 border border-default-100 text-small text-default-500">
                  Account configuration parameters are fully parsed and running cleanly.
                </Tabs.Panel>
                <Tabs.Panel id="tab-2" className="mt-4 p-4 rounded-xl bg-default-50 border border-default-100 text-small text-default-500">
                  Encryption logs show zero signature verification anomalies over the past 48 hours.
                </Tabs.Panel>
                <Tabs.Panel id="tab-3" className="mt-4 p-4 rounded-xl bg-default-50 border border-default-100 flex items-center gap-3 text-small text-primary font-medium">
                  <Spinner size="sm" /> Fetching raw server event streams...
                </Tabs.Panel>
              </Tabs>
            </Card.Content>
          </Card>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-default-100 px-6 py-6 text-center text-xs text-default-400">
        &copy; {new Date().getFullYear()} Token Canvas Preview Tool. Built for HeroUI v3.
      </footer>
    </div>
  );
}
