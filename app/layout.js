import "./globals.css";
import ClientLayout from "@/components/Layout";

export const metadata = {
  title: "funkySouq",
  description: "Minimal e-commerce frontend with nested categories and cart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-800">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
