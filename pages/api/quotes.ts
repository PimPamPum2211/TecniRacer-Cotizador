import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import type { Prisma } from '@prisma/client';

type QuoteWithRelations = Prisma.QuoteGetPayload<{
  include: { service: true; customer: true };
}>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const quotes: QuoteWithRelations[] = await prisma.quote.findMany({
    include: { service: true, customer: true },
    orderBy: { createdAt: 'desc' }
  });

  res.json(
    quotes.map((q) => ({
      id: q.id,
      serviceId: q.serviceId,
      price: Number(q.price),
      createdAt: q.createdAt,
      serviceName: q.service.name,
      customer: q.customer ? q.customer.name : null
    }))
  );
}
