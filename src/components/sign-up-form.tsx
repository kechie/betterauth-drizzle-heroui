"use client";

import { Card, Form, Button, Input, TextField, Label ,Link} from "@heroui/react";
import { authClient } from "@lib/auth-client";
import { useState } from "react";
import { ShieldAlert } from "lucide-react"; // Nice alert icon for errors

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 👈 State for the error message

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset error state on new submission
    // Better Auth client methods return { data, error } instead of throwing
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/sign-in",
    });

    if (error) {
    // Extract the message sent from your backend database Hook ("Registration is closed...")
      setErrorMessage(error.message || "An unexpected error occurred during registration.");

    } else {
      // Redirect to the sign-in page with delay
      <Link href="/sign-in">Sign In Instead</Link>
      window.location.href = "/sign-in";
    }
    /* await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/sign-in",
    }); */

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col gap-4">
      {/* 👈 Dynamic Error Box using HeroUI v3 layout syntax */}
            {errorMessage && (
              <Card className="w-full border border-danger-200 bg-danger-50 dark:bg-danger-950/20 text-danger-700 dark:text-danger-400 shadow-none">
                <Card.Content className="flex gap-3 items-center p-4 text-xs font-medium">
                  <ShieldAlert className="shrink-0" size={16} />
                  <p>{errorMessage}</p>
                </Card.Content>
              </Card>
            )}
      {/* HeroUI v3 pattern wraps form fields in a TextField container */}
      <TextField isRequired name="name">
        <Label>Name</Label>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Fixed: standard React onChange
        />
      </TextField>
      <TextField isRequired name="email" type="email">
        <Label>Email</Label>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Fixed: standard React onChange
        />
      </TextField>
      <TextField isRequired name="password" type="password">
        <Label>Password</Label>
        <Input
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Fixed: standard React onChange
        />
      </TextField>
      <Button type="submit" variant="primary" isLoading={loading} className="w-full">
        Sign Up
      </Button>
    </Form>
  );
}
