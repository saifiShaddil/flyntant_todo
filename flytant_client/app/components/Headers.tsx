'use client';

import React from 'react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white h-[12vh] flex items-center px-6 shadow-md">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={120}
        height={40}
        priority
      />
    </header>
  );
}
