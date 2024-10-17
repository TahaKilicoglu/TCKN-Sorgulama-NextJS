// app/layout.js
import React from 'react';
import './globals.css';
import Navbar from './components/Navbar';

process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning') {
    // DeprecationWarning'ları göz ardı et
    return;
  }
  console.warn(warning.name, warning.message);
});

export const metadata = {
  title: 'Kimlik Doğrulama Sistemi',
  description: 'T.C. kimlik numarası doğrulama uygulaması.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
      <Navbar /> 
        <div className="home">
          {children}
        </div>
      </body>
    </html>
  );
}
