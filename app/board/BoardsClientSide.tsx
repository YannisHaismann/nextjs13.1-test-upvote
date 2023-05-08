'use client';

import type { Board } from '@prisma/client';
import useSWR from 'swr';
import React, { type FC } from 'react';
import { BoardCard } from '~/src/components/board/BoardCard';
import LinkBtn from '~/src/components/form/LinkBtn';
import { type DataBoards, type DisplayDatasBoardsProps } from '~/src/types';

const NUMBER_OF_BOARDS_PER_PAGE = 5;

const fetcher = async (
  ...args: [RequestInfo, RequestInit?]
): Promise<DataBoards> =>
  await fetch(...args).then(async (res) => await res.json());

const DisplayDatas: FC<DisplayDatasBoardsProps> = ({
  data,
  error,
  isLoading,
}) => {
  if (isLoading) return <p className="text-center text-lg grow">Loading...</p>;
  if (error)
    return <p className="text-center text-lg grow">Failed to load datas...</p>;
  if (!data?.boards)
    return <p className="text-center text-lg grow">Aucune donnée</p>;

  return (
    <ul className="flex flex-col gap-4 mb-10 h-full grow">
      {data?.boards.map((board: Board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </ul>
  );
};

function BoardsClientSide(props: { page: number }): JSX.Element {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/boards?itemsPerPage=${NUMBER_OF_BOARDS_PER_PAGE}&page=${props.page}`,
    fetcher
  );

  return (
    <>
      <DisplayDatas data={data} error={error} isLoading={isLoading} />
      <div className="flex gap-4">
        <LinkBtn
          text="Page précédente"
          disabled={props.page === 1}
          color={props.page === 1 ? 'bg-indigo-700' : 'bg-indigo-800'}
          className={`p-6 w-72 ${
            props.page === 1 ? 'opacity-50 cursor-default' : ''
          }`}
          href={`/board?ssr=false&pagination=${Number(props.page) - 1}`}
        />
        <LinkBtn
          text="Page suivante"
          disabled={
            !data || data.count <= (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
          }
          color={
            !data || data.count <= (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
              ? 'bg-indigo-700'
              : 'bg-indigo-800'
          }
          className={`p-6 w-72 ${
            !data || data.count <= (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
              ? 'opacity-50 cursor-default'
              : ''
          }`}
          href={`/board?ssr=false&pagination=${Number(props.page) + 1}`}
        />
      </div>
    </>
  );
}

export default BoardsClientSide;
