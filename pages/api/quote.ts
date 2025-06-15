import type { NextApiRequest, NextApiResponse } from 'next';
import services from '../../data/services.json';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { serviceId, name, phone } = req.body as { serviceId?: string; name?: string; phone?: string };
  if (!serviceId || typeof serviceId !== 'string') {
    return res.status(400).json({ error: 'serviceId required' });
  }
  const service = services.find((s) => s.id === serviceId);
  if (!service) return res.status(404).end();

  let customerId: string | undefined;
  if (phone && name) {
    const customer = await prisma.customer.upsert({
      where: { phone },
      update: { name },
      create: { name, phone }
    });
    customerId = customer.id;
  }

  const quote = await prisma.quote.create({
    data: { serviceId, price: service.basePrice, customerId }
  });
  res.json({ quoteId: quote.id, price: quote.price });
}
