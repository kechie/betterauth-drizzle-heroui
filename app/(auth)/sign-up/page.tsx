import SignUpForm from "@components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-small text-default-500">
          Enter your details below to get started
        </p>
      </div>

      <SignUpForm />
    </div>
  );
}
