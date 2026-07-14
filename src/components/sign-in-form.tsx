"use client";

import { Form, Button, Input, TextField, Label } from "@heroui/react";
import { authClient } from "@lib/auth-client";
import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard", // where to go after successful login
    });

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
      {/* HeroUI v3 pattern wraps form fields in a TextField container */}
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
        Sign In
      </Button>
    </Form>
  );
}
