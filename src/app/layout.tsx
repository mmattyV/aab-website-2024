
import '@/app/ui/globals.css';
import { questrial } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${questrial.className} antialiased`}>{children}</body>
    </html>
  )
}