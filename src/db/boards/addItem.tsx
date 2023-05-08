'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '~/src/db/prisma';

async function addItem(question: string, path: string): Promise<void> {
  await prisma.board.create({ data: { title: question } });

  revalidatePath(path);
}

export default addItem;
