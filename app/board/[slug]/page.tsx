'use client';

import useSWR from 'swr';
import React, { useState } from 'react';
import { PropositionLine } from '~/src/components/proposition/PropositionLine';
import DialogAddProposition from '~/src/components/proposition/DialogAddProposition';
import Btn from '~/src/components/form/Btn';
import LinkBtn from '~/src/components/form/LinkBtn';
import { type PropositionsWithVotes, type DataPropositions } from '~/src/types';

const NUMBER_OF_PROPOSITIONS_PER_PAGE = 5;

const fetcher = async (
  ...args: [RequestInfo, RequestInit?]
): Promise<DataPropositions> =>
  await fetch(...args).then(async (res) => await res.json());

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  const GET_BOARD_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/propositions/${params.slug}?itemsPerPage=${NUMBER_OF_PROPOSITIONS_PER_PAGE}&page=${searchParams.page}`;
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading } = useSWR(GET_BOARD_API_URL, fetcher);

  console.log(data);

  if (isLoading) return <p className="text-center text-lg grow">Loading...</p>;
  if (error)
    return <p className="text-center text-lg grow">Failed to load datas...</p>;

  return (
    <>
      <DialogAddProposition
        mutateUrl={GET_BOARD_API_URL}
        boardId={Number(params.slug)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <h2 className="text-center text-3xl font-semibold mb-10">
        {data?.board?.title}
      </h2>
      <Btn
        color="bg-green-700"
        hoverColor="hover:bg-green-600"
        className="mb-10 p-6"
        text="Ajouter une proposition"
        action={() => {
          setIsOpen(true);
        }}
      />
      <div className="flex flex-col gap-4">
        {!data?.propositions || !data.propositions[0] ? (
          <p className="text-center text-lg grow">Aucune donnée</p>
        ) : (
          data.propositions.map((proposition: PropositionsWithVotes) => (
            <PropositionLine
              mutateUrl={GET_BOARD_API_URL}
              key={proposition.id}
              id={proposition.id}
              voteCount={Number(proposition.vote?.length)}
              title={proposition.title}
              boardId={Number(params.slug)}
            />
          ))
        )}
      </div>
      <div className="flex grow gap-4 w-full justify-center items-end">
        <LinkBtn
          text="Page précédente"
          disabled={Number(searchParams.page) === 1}
          color={
            Number(searchParams.page) === 1 ? 'bg-indigo-700' : 'bg-indigo-800'
          }
          className={`mt-10 p-6 min-w-[18rem] shrink-0 ${
            Number(searchParams.page) === 1 ? 'opacity-50 cursor-default' : ''
          }`}
          href={`/board/${params.slug}?page=${Number(searchParams.page) - 1}`}
        />
        <LinkBtn
          text="Page suivante"
          disabled={
            !data ||
            data.count <=
              Number(searchParams.page) * NUMBER_OF_PROPOSITIONS_PER_PAGE
          }
          color={
            !data ||
            data.count <=
              Number(searchParams.page) * NUMBER_OF_PROPOSITIONS_PER_PAGE
              ? 'bg-indigo-700'
              : 'bg-indigo-800'
          }
          className={`mt-10 p-6 min-w-[18rem] shrink-0 ${
            !data ||
            data.count <=
              Number(searchParams.page) * NUMBER_OF_PROPOSITIONS_PER_PAGE
              ? 'opacity-50 cursor-default'
              : ''
          }`}
          href={`/board/${params.slug}?page=${Number(searchParams.page) + 1}`}
        />
      </div>
    </>
  );
}

export default Page;
