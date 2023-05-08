import { type CreateVoteReturn } from './../../../../../../src/types/index';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/src/db/prisma';
import requestIp from 'request-ip';
import { type NextResponse } from 'next/server';
import { type Error } from '~/src/types';

export default async function createVote(
  req: NextApiRequest,
  res: NextApiResponse<CreateVoteReturn | Error>
): Promise<NextResponse | undefined> {
  if (req.method !== 'POST') {
    res.status(405).json({ name: 'Method Not Allowed' });
    return;
  }
  const detectedIp = requestIp.getClientIp(req);
  if (!detectedIp) {
    res.status(401).json({ name: 'Error when getting the ip' });
    return;
  }

  const { boardId, propositionId } = req.query;

  // Reject flood requests
  const WAITING_TIME = 5 * 1000;
  const floodProposition = await prisma.proposition.findFirst({
    where: {
      ip: detectedIp,
      boardId: Number(boardId),
      createdAt: {
        gte: new Date(), // min
        lt: new Date(+new Date() + WAITING_TIME), // max
      },
    },
  });
  if (floodProposition) {
    res.status(401).json({ name: 'To much requests, wait 5s.' });
    return;
  }

  let vote;
  const alreadyVote = await prisma.vote.findFirst({
    where: {
      propositionId: Number(propositionId),
      ip: detectedIp,
    },
  });
  if (alreadyVote) {
    vote = await prisma.vote.delete({
      where: {
        id: Number(alreadyVote.id),
      },
    });
  } else {
    vote = await prisma.vote.create({
      data: {
        propositionId: Number(propositionId),
        ip: detectedIp,
        createdAt: new Date(),
      },
    });
  }

  res
    .status(201)
    .json({ vote, message: alreadyVote ? 'Vote deleted' : 'Vote added' });
}
