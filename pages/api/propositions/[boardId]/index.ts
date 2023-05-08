// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/src/db/prisma';
import { type Error, type DataPropositions } from '~/src/types';
import { type NextResponse } from 'next/server';

export default async function getPropositions(
  req: NextApiRequest,
  res: NextApiResponse<DataPropositions | Error>
): Promise<NextResponse | undefined> {
  if (req.method !== 'GET') {
    res.status(405).json({ name: 'Method Not Allowed' });
    return;
  }

  const { boardId, page, itemsPerPage } = req.query;

  const pageAsNumber = Number(page);
  const itemsPerPageAsNumber = Number(itemsPerPage);

  const propositions = await prisma.proposition.findMany({
    where: {
      boardId: Number(boardId),
    },
    include: {
      vote: true,
      board: true,
    },
    orderBy: {
      vote: {
        _count: 'desc',
      },
    },
    take: itemsPerPageAsNumber || 5,
    skip: (pageAsNumber - 1) * (itemsPerPageAsNumber || 5),
  });

  const aggregations = await prisma.proposition.aggregate({
    where: {
      boardId: Number(boardId),
    },
    _count: {
      id: true,
    },
  });

  // Get board title
  const board = await prisma.board.findFirst({
    where: {
      id: Number(boardId),
    },
  });

  res.status(201).json({ propositions, board, count: aggregations._count.id });
}
