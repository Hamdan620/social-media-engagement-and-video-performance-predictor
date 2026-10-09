"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, FileText, Database, Shield } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Performance Predictor", icon: BarChart2 },
    { href: "/dataset", label: "Dataset & Validation", icon: Database },
    { href: "/synopsis", label: "Project Synopsis", icon: FileText },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 font-bold text-base shadow-sm">
              VP
            </div>
            <div>
              <div className="font-semibold text-zinc-100 text-sm sm:text-base leading-tight tracking-tight flex items-center gap-2">
                <span>VideoPerformance Predictor</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  ML v2.4
                </span>
              </div>
              <p className="text-xs text-zinc-400">Short-Form Video Engagement & Script Quality Engine</p>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4 text-zinc-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="font-mono text-zinc-300 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>10,000 Vectors Validated</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">5-Fold Stratified CV: 63.2%</div>
          </div>
        </div>
      </div>
    </header>
  );
}
