import React, { type PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren): JSX.Element {
  return <div className="grow flex flex-col p-10">{children}</div>;
}

export default Layout;
