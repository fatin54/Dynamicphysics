import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'HSC Physics Lab | Chapter 2 Vector & Chapter 3 Dynamics (গতিবিদ্যা)',
  description: 'An interactive, English-first learning platform for Bangladesh NCTB HSC Physics 1st Paper. Chapter 2: Vector (ভেক্টর) & Chapter 3: Dynamics (গতিবিদ্যা). Built around NCTB standards by Dr. Shahjahan Tapan & Ishak Sir.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-sand-bg text-sand-text selection:bg-orange-light selection:text-orange-deep pb-16 lg:pb-0">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
