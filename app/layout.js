import InitialLoader from "@/components/InitialLoader";
import "./globals.css";
import ClientLayout from "@/components/Layout";
// In your layout or root component file (e.g. `app/layout.tsx` or `_app.js`)
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"], // pick the weights you want
  variable: "--font-jost", // optional: for using as a CSS variable
  display: "swap",
});

export const metadata = {
  title: "funkySouq",
  description: "Minimal e-commerce frontend with nested categories and cart",
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
