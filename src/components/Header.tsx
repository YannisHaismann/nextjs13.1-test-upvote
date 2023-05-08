'use client';

import Link from 'next/link';
import React, { FC, Fragment, useState } from 'react';
import DialogAddboard from './board/DialogAddboard';
import LinkBtn from './form/LinkBtn';

function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DialogAddboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-5 border-b border-white flex justify-between">
        <Link href="/">
          <h5 className="text-2xl font-bold tracking-tight text-white p-4 rounded-lg">
            Home
          </h5>
        </Link>
        <div className="flex gap-5">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
            className="text-2xl block p-4 rounded-lg shadow font-bold tracking-tight text-white bg-green-700 transition-colors duration-100 hover:bg-green-600"
          >
            Ajouter une question
          </button>
          <LinkBtn text="Board SSR" href="/board?ssr=true&pagination=1" />
          <LinkBtn text="Board Client" href="/board?ssr=false&pagination=1" />
        </div>
      </div>
    </>
  );
}

export default Header;
