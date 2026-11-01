import { SubpageShell } from "@/components/layouts/subpage-shell";

export default function DelegatesLayout({ children }: LayoutProps<"/delegates">) {
  return <SubpageShell>{children}</SubpageShell>;
}
