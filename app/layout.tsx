import type { Metadata } from "next";
import { Inter, Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "../components/nav/Navbar";
import GlobalSearch from "@/components/search/GlobalSearch";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import Footer from "@/components/Footer";
import ResourceModal from "@/app/dashboard/components/ResourceModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fctea.com"),
  title: {
    template: "%s | fctea",
    default: "fctea | Abuja City Platform",
  },
  authors: { name: "Terrod" },
  description:
    "fctea is your lightweight city operating system for Abuja culture, nightlife, places, people, and events. Discover what's hot in the FCT.",
  openGraph: {
    title: "fctea",
    description: "Abuja's premier discovery platform for culture, events, and trending hotspots.",
    url: "https://fctea.com",
    siteName: "fctea",
    images: "/og.png",
    type: "website",
  },
  keywords: ["Abuja", "Culture", "Nightlife", "Events", "FCT", "Nigeria"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-[#FFFAF5] text-[#2D241E] min-h-screen flex flex-col",
          inter.variable,
          raleway.variable,
          montserrat.variable
        )}
      >
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <GlobalSearch />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
              <Toaster />
              <ResourceModal />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
