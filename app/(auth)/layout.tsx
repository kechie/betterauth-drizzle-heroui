// app/(auth)/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 sm:p-8">
      {/* Background decoration grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] background-size:[16px_16px] opacity-40 dark:bg-[radial-gradient(#333_1px,transparent_1px)]" />
      <main className="w-full max-w-md flex flex-col items-center gap-6 rounded-2xl border border-divider bg-content1 p-6 shadow-medium sm:p-10">
        {/* Pages inject their own content right inside this wrapper */}
        {children}
      </main>
    </div>
  );
}
