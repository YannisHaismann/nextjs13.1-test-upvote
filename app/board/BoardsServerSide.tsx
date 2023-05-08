import { type Board } from '@prisma/client';
import React from 'react';
import { BoardCard } from '~/src/components/board/BoardCard';
import LinkBtn from '~/src/components/form/LinkBtn';
import { prisma } from '~/src/db/prisma';

const NUMBER_OF_BOARDS_PER_PAGE = 5;

async function BoardsServerSide(props: { page: number }): Promise<JSX.Element> {
  const boards = await prisma.board.findMany({
    orderBy: { createdAt: 'desc' },
    take: NUMBER_OF_BOARDS_PER_PAGE || 5,
    skip: (props.page - 1) * (NUMBER_OF_BOARDS_PER_PAGE || 5),
  });

  const aggregations = await prisma.board.aggregate({
    _count: {
      id: true,
    },
  });

  return (
    <>
      <ul className="flex flex-col gap-4 mb-10 h-full grow">
        {boards.map((board: Board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </ul>
      <div className="flex gap-4">
        <LinkBtn
          text="Page précédente"
          disabled={props.page === 1}
          color={props.page === 1 ? 'bg-indigo-700' : 'bg-indigo-800'}
          className={`p-6 w-72 ${
            props.page === 1 ? 'opacity-50 cursor-default' : ''
          }`}
          href={`/board?ssr=true&pagination=${Number(props.page) - 1}`}
        />
        <LinkBtn
          text="Page suivante"
          disabled={
            aggregations._count.id <=
            (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
          }
          color={
            aggregations._count.id <=
            (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
              ? 'bg-indigo-700'
              : 'bg-indigo-800'
          }
          className={`p-6 w-72 ${
            aggregations._count.id <=
            (props.page + 1) * NUMBER_OF_BOARDS_PER_PAGE
              ? 'opacity-50 cursor-default'
              : ''
          }`}
          href={`/board?ssr=true&pagination=${Number(props.page) + 1}`}
        />
      </div>
    </>
  );
}

export default BoardsServerSide;
