import { type Proposition } from '@prisma/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/src/db/prisma';
import requestIp from 'request-ip';
import { type NextResponse } from 'next/server';

interface PropositionType {
  proposition: Proposition;
}

interface Error {
  name: string;
}

export default async function createProposition(
  req: NextApiRequest,
  res: NextApiResponse<PropositionType | Error>
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

  const { title } = req.body;
  const { boardId } = req.query;

  const proposition = await prisma.proposition.create({
    data: {
      title,
      boardId: Number(boardId),
      ip: detectedIp,
    },
  });

  res.status(201).json({ proposition });
}
