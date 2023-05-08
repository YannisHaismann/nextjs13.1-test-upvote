import Link from 'next/link';
import React, { type FC } from 'react';
import Btn from './Btn';

interface LinkBtnProps {
  text: string;
  href: string;
  className?: string;
  color?: string;
  hoverColor?: string;
  disabled?: boolean;
}

const LinkBtn: FC<LinkBtnProps> = ({
  text,
  href,
  color = 'bg-indigo-800',
  hoverColor = 'hover:bg-indigo-700',
  className = '',
  disabled = false,
}) => {
  return disabled ? (
    <Btn
      text={text}
      className={className}
      color={color}
      hoverColor={hoverColor}
    />
  ) : (
    <Link href={href}>
      <Btn
        text={text}
        className={className}
        color={color}
        hoverColor={hoverColor}
      />
    </Link>
  );
};

export default LinkBtn;
