import "@/app/ui/globals.css";
import { questrial } from "@/app/ui/fonts";
import { Header } from "@/app/ui/components/Header";
import { Footer } from "./ui/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${questrial.className} antialiased`}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex flex-col flex-grow">{children}</main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center w-full mt-5 mb-10">
          <Footer
            year={new Date().getFullYear()}
            logo="/aablogowhite.png"
            icon="/email-icon.svg"
          />
        </footer>
      </body>
    </html>
  );
}
