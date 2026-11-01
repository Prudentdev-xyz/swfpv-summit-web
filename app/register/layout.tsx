import { SubpageShell } from "@/components/layouts/subpage-shell";

export default function RegisterLayout({ children }: LayoutProps<"/register">) {
  return <SubpageShell>{children}</SubpageShell>;
}
