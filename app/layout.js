import InitialLoader from "@/components/InitialLoader";
import "./globals.css";
import ClientLayout from "@/components/Layout";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: "funkySouq",
  description: "Minimal e-commerce frontend with nested categories and cart",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 text-gray-800 ${jost.className}`}>
        <InitialLoader />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
