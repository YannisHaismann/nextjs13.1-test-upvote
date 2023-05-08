'use client';

import React, { type FC } from 'react';

interface LinkProps {
  text: string;
  className?: string;
  color?: string;
  hoverColor?: string;
  action?: () => void;
}

const Btn: FC<LinkProps> = ({
  text,
  color = 'bg-indigo-700',
  hoverColor = 'hover:bg-indigo-800',
  className = null,
  action,
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        action?.();
      }}
      className={`${className} text-2xl block text-center p-4 rounded-lg shadow font-bold tracking-tight text-white ${color} ${hoverColor} transition-colors duration-100`}
    >
      {text}
    </button>
  );
};

export default Btn;
