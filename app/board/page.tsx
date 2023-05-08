import React from 'react';
import BoardsClientSide from './BoardsClientSide';
import BoardsServerSide from './BoardsServerSide';

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  return (
    <div className="mx-auto w-fit h-full flex flex-col grow">
      <h2 className="text-3xl font-semibold mb-2 text-center">
        La liste des questions
      </h2>
      {searchParams.ssr === 'true' ? (
        <>
          <h2 className="mb-10 text-lg text-center">(Board Server Side)</h2>
          {/* Commentary below recommanded at that page : https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */}
          {/* @ts-expect-error Async Server Component */}
          <BoardsServerSide page={Number(searchParams.pagination)} />
        </>
      ) : (
        <>
          <h2 className="mb-10 text-lg text-center">(Board Client Side)</h2>
          <BoardsClientSide page={Number(searchParams.pagination)} />
        </>
      )}
    </div>
  );
}

export default Page;
