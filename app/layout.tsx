import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "🚀 Rocket Landing Quest", description: "Teach AI to land a rocket!" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
