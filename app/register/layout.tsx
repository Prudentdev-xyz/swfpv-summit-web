import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/buttons/theme-toggle";
import { Footer } from "@/components/layouts/footer";

export default function RegisterLayout({ children }: LayoutProps<"/register">) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-surface">
      <nav className="flex h-[76px] items-center justify-between border-b border-line bg-surface px-[clamp(20px,4vw,56px)]">
        <Link href="/" className="flex items-center">
          <Image
            src="/dolf-hydrometric-logo.png"
            alt="D-OLF Hydrometric Nigeria Limited"
            width={256}
            height={152}
            preload
            className="block h-[52px] w-auto dark:hidden"
          />
          <Image
            src="/dolf-hydrometric-logo-dark.png"
            alt="D-OLF Hydrometric Nigeria Limited"
            width={249}
            height={146}
            className="hidden h-[52px] w-auto dark:block"
          />
        </Link>
        <div className="flex items-center gap-[clamp(12px,2.6vw,28px)]">
          <Link href="/" className="text-[15px] font-semibold text-heading hover:text-ocean">
            ← Back to summit
          </Link>
          <ThemeToggle />
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
