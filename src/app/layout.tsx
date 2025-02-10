import "@/app/ui/globals.css";
import { questrial } from "@/app/ui/fonts";
import { Header } from "@/app/ui/components/Header";
import { Footer } from "./ui/components/Footer";
import { Suspense } from "react"; // ✅ Import Suspense
import Loading from "./ui/components/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${questrial.className} antialiased bg-black text-white`}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex flex-col flex-grow">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center w-full bg-black mt-5 mb-10">
          <Footer
            year={new Date().getFullYear()}
            logo="/aablogowhite.png"
            icon="/email-w-icon.svg"
          />
        </footer>
      </body>
    </html>
  );
}