import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />

        <main className="flex-grow">{children}</main>
        <Footer className="fixed bottom-0 left-0 w-full" />
      </body>
    </html>
  );
}
