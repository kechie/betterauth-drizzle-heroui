"use client";

import { Form, Button, Input, TextField, Label } from "@heroui/react";
import { authClient } from "@lib/auth-client";
import { useState } from "react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/sign-in",
    });

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col gap-4">
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
