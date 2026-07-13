"use client";

import { Button, Input, Tabs, Spinner, Card, TextField } from '@heroui/react';
import { useState } from 'react';
import { Check, Mail, Sparkles, LayoutGrid, Layers, Settings, ArrowRight } from 'lucide-react';
import { ThemeSwitcher } from '@components/theme-switcher';

export default function HeroUIApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleTriggerAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("HeroUI states updated successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* 1. Global Navigation Bar Banner */}
      <header className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-lg font-bold tracking-tight text-foreground">HeroUI Workspace</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </header>

      {/* 2. Main Showcase Canvas */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col gap-8">

        <section className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Component Showcase
          </h1>
          <p className="text-default-500 text-small md:text-medium leading-relaxed">
            Exploring state management, tab isolation structures, and variable loading parameters inside HeroUI v3.
          </p>
        </section>

        {/* 3. HeroUI v3 Decoupled Compound Tabs System */}
        <Tabs defaultSelectedKey="overview" className="w-full">
          {/* List Section: Houses all tab button triggers */}
          <Tabs.ListContainer>
            <Tabs.List aria-label="Component categories" variant="primary">
              <Tabs.Tab id="overview">
                <div className="flex items-center gap-2 px-1">
                  <LayoutGrid className="h-4 w-4" />
                  <span>Forms & States</span>
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab id="structural">
                <div className="flex items-center gap-2 px-1">
                  <Layers className="h-4 w-4" />
                  <span>Layout Cards</span>
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab id="settings">
                <div className="flex items-center gap-2 px-1">
                  <Settings className="h-4 w-4" />
                  <span>Configurations</span>
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          {/* Panels Section: Swapped independently by matching id links */}
          <Tabs.Panel id="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card One: Form Inputs */}
              <Card className="p-6 border border-default-100 shadow-sm">
                <Card.Header className="flex flex-col items-start gap-1 pb-4">
                  <Card.Title className="text-xl font-bold">Input Layouts</Card.Title>
                  <Card.Description className="text-default-400 text-xs">
                    Native micro-validation with beautiful inside icons.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="flex flex-col gap-4">
                  <TextField
                    label="Subscriber Email"
                    labelPlacement="outside"
                    isRequired
                    className="w-full flex flex-col gap-1.5"
                  >
                    <div className="relative flex items-center">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        variant="primary"
                        value={email}
                        onValueChange={setEmail}
                        className="pl-8" // Add padding to not overlap the icon
                        endContent={
                          email.includes("@") && email.includes(".") && (
                            <Check className="text-success h-4 w-4" />
                          )
                        }
                      />
                      <div className="absolute left-3 flex items-center pointer-events-none">
                        <Mail className="text-default-400 h-4 w-4" />
                      </div>
                    </div>
                  </TextField>
                  <div className="flex gap-2 justify-end mt-2">
                    <Button variant="flat" size="sm" onClick={() => setEmail("")}>
                      Clear
                    </Button>
                    <Button variant="primary" size="sm" endContent={<ArrowRight className="h-3.5 w-3.5" />}>
                      Submit Entry
                    </Button>
                  </div>
                </Card.Content>
              </Card>

              {/* Card Two: Async Actions */}
              <Card className="p-6 border border-default-100 shadow-sm">
                <Card.Header className="flex flex-col items-start gap-1 pb-4">
                  <Card.Title className="text-xl font-bold">Async Loading State</Card.Title>
                  <Card.Description className="text-default-400 text-xs">
                    Simulate network updates triggering custom spinner frames.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="flex flex-col items-center justify-center py-6 gap-6 min-h-[140px]">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Spinner size="lg" color="primary" />
                      <span className="text-xs text-primary font-medium animate-pulse">
                        Processing layout request...
                      </span>
                    </div>
                  ) : (
                    <div className="text-center flex flex-col gap-4 items-center">
                      <p className="text-small text-default-500 max-w-[260px]">
                        Click the trigger button below to verify the full async processing loop.
                      </p>
                      <Button
                        color="secondary"
                        variant="shadow"
                        onClick={handleTriggerAction}
                      >
                        Launch Server Task
                      </Button>
                    </div>
                  )}
                </Card.Content>
              </Card>

            </div>
          </Tabs.Panel>

          <Tabs.Panel id="structural" className="mt-6">
            <Card className="p-8 border border-default-100 text-center flex flex-col gap-3 items-center max-w-md mx-auto shadow-sm">
              <div className="h-12 w-12 rounded-full bg-success-50 dark:bg-success-950/30 text-success flex items-center justify-center">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mt-2">Structural Layer Verified</h3>
              <p className="text-default-500 text-small leading-relaxed">
                This panel proves how cleanly HeroUI v3 updates tabs without causing destructive layout flashes or complete browser repaints.
              </p>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel id="settings" className="mt-6">
            <div className="max-w-md mx-auto">
              <Card className="p-6 border border-default-100 shadow-sm">
                <Card.Header>
                  <Card.Title className="text-medium font-bold">Workspace Preferences</Card.Title>
                </Card.Header>
                <Card.Content className="flex flex-col gap-4 text-small text-default-500">
                  <p>• System Themes: Enabled</p>
                  <p>• Client Engine: React 19 Runtime</p>
                  <p>• Compilation: Next.js Turbopack Bundle</p>
                </Card.Content>
              </Card>
            </div>
          </Tabs.Panel>
        </Tabs>

      </main>
    </div>
  );
}
