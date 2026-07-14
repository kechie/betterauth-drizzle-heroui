"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShieldAlert, Settings } from "lucide-react";

export default function SidebarNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview Workspace", icon: LayoutDashboard, visible: true },
    { href: "/dashboard/user-manager", label: "User Directory", icon: Users, visible: isAdmin },
    { href: "/dashboard/settings", label: "System Profiles", icon: Settings, visible: true },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {links
        .filter((l) => l.visible)
        .map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 h-10 rounded-medium text-small font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-default-600 hover:bg-default-100 hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
}
