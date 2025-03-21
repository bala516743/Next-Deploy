'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
  <body
    className={`${geistSans.variable} ${geistMono.variable}`}
    style={{
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
<div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    pointerEvents: 'none',
    overflow: 'hidden',
  }}
>
  {/* Your Lottie background */}
  <DotLottieReact
    src="https://lottie.host/5b52dc12-a62c-4a8d-b288-f8f377cd3ac0/HIdqWYCRa8.lottie"
    loop
    autoplay
    style={{
      position: 'absolute',
      top: 0,
      left: '-10%',
      width: '120%',
      height: '120%',
      objectFit: 'cover',
      pointerEvents: 'none',
    }}
  />

  {/* Black overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      pointerEvents: 'none',
    }}
  />
</div>

    {/* Foreground Content */}
    <div
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" /> {/* Add this line */}
      </head>
      <Header />
      <Provider store={store}>{children}</Provider>
    </div>
  </body>
</html>


  );
}