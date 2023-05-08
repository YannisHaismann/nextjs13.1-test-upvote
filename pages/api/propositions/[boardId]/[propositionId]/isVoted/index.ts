import { type Vote } from '@prisma/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/src/db/prisma';
import requestIp from 'request-ip';
import { type NextResponse } from 'next/server';
import { type IsVotedType, type Error } from '~/src/types';

export default async function getIsVoted(
  req: NextApiRequest,
  res: NextApiResponse<IsVotedType | Error>
): Promise<NextResponse | undefined> {
  if (req.method !== 'GET') {
    res.status(405).json({ name: 'Method Not Allowed' });
    return;
  }
  const detectedIp = requestIp.getClientIp(req);
  if (!detectedIp) {
    res.status(401).json({ name: 'Error when getting the ip' });
    return;
  }

  const { propositionId } = req.query;

  const alreadyVote = await prisma.vote.findMany({
    where: {
      propositionId: Number(propositionId),
      ip: detectedIp,
    },
  });

  res.status(201).json({ alreadyVote });
}
