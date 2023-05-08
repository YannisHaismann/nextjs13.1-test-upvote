import { type Board } from '@prisma/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextResponse } from 'next/server';
import { prisma } from '~/src/db/prisma';

interface Data {
  boards: Board[];
  count: number;
}

interface Error {
  name: string;
}

export default async function getBoards(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
): Promise<NextResponse | undefined> {
  if (req.method !== 'GET') {
    res.status(405).json({ name: 'Method Not Allowed' });
    return;
  }

  const { page, itemsPerPage } = req.query;
  const pageAsNumber = Number(page);
  const itemsPerPageAsNumber = Number(itemsPerPage);

  const boards = await prisma.board.findMany({
    orderBy: { createdAt: 'desc' },
    take: itemsPerPageAsNumber || 5,
    skip: (pageAsNumber - 1) * (itemsPerPageAsNumber || 5),
  });

  const aggregations = await prisma.board.aggregate({
    _count: {
      id: true,
    },
  });

  res.status(201).json({
    boards,
    count: aggregations._count.id ? aggregations._count.id : 0,
  });
}
