import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const quotes = await prisma.quote.findMany({
    include: { service: true, customer: true },
    orderBy: { createdAt: 'desc' }
  });

  res.json(
    quotes.map((q: any) => ({
      id: q.id,
      serviceId: q.serviceId,
      price: q.price,
      createdAt: q.createdAt,
      serviceName: q.service.name,
      customer: q.customer ? q.customer.name : null
    }))
  );
}
