//import Image from "next/image";
// TODO: Fonts
// Theming is ok na I think
import { Button, Link, Surface } from '@heroui/react';
import { ThemeSwitcher } from '@components/theme-switcher';
import { Inter, JetBrains_Mono } from 'next/font/google'
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const jet = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});
export default function Home() {
  return (
    <div className={`flex flex-col flex-1 items-center justify-center`} >
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Button variant="tertiary">Hello HeroUI</Button>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-soft">Danger Soft</Button>
        </div>
        <ThemeSwitcher />
{/*         <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Default</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a default surface variant. It uses bg-surface styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Secondary</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a secondary surface variant. It uses bg-surface-secondary styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Tertiary</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a tertiary surface variant. It uses bg-surface-tertiary styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Transparent</p>
            <Surface
              className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
              variant="transparent"
            >
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a transparent surface variant. It has no background, suitable for overlays and
                cards with custom backgrounds.
              </p>
              <Link href="/sign-in">
                <button>Sign In</button>
                <Link.Icon />
              </Link>
              <ThemeSwitcher />
            </Surface>
          </div>
        </div> */}

      </main>
    </div>
  );
}
