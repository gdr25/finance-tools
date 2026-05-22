import React from 'react';

export const metadata = {
  title: 'Nexus Finance Tools',
  description: 'Premium modern financial calculation suite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
