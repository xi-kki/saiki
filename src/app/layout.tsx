import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saiki — Daily Wisdom for the Curious Mind',
  description: 'Daily philosophy and psychology tips. Stoicism, Existentialism, Jungian wisdom — delivered beautifully to your inbox, push notifications, or in-app feed.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Saiki',
  },
  openGraph: {
    title: 'Saiki — Daily Wisdom',
    description: 'Philosophy & psychology tips, delivered daily.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen bg-saiki-bg antialiased">
        {children}
      </body>
    </html>
  );
}
