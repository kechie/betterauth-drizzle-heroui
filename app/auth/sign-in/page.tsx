"use client";

import { Form, Input, Button } from "@heroui/react";
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
      <Input
        label="Email"
        type="email"
        value={email}
        onValueChange={setEmail}
        isRequired
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onValueChange={setPassword}
        isRequired
      />
      <Button type="submit" color="primary" isLoading={loading} className="w-full">
        Sign In
      </Button>
    </Form>
  );
}
