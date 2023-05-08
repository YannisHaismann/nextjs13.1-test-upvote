import { type Board } from '@prisma/client';
import Link from 'next/link';

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps): JSX.Element => {
  return (
    <Link
      href={`/board/${board.id}?page=1`}
      className="block p-6 w-full rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
      <h5 className="text-2xl font-bold tracking-tight text-white">
        {board.title}
      </h5>
    </Link>
  );
};
