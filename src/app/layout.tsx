import '@/app/ui/globals.css';
import { questrial } from '@/app/ui/fonts';
import { Header } from '@/app/ui/homepage/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${questrial.className} antialiased`}>
        {/* Add the Header (menu bar) here */}
        <Header/>
        {/* Render the page-specific content */}
        {children}
      </body>
    </html>
  );
}