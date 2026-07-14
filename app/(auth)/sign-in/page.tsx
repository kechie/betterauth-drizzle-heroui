import SignInForm from "@components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-small text-default-500">
          Please enter your details to sign in
        </p>
      </div>

      <SignInForm />
    </div>
  );
}
