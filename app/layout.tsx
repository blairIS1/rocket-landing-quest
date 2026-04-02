import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { 
  title: "🚀 Rocket Landing Quest", 
  description: "Teach AI to land a rocket!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
