import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const schema = z.object({
    serviceId: z.string(),
    name: z.string().optional(),
    phone: z.string().optional()
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const { serviceId, name, phone } = parsed.data;

  const service = await prisma.service.findUnique({ where: { slug: serviceId } });
  if (!service) return res.status(404).end();

  try {
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
      data: { serviceId: service.id, price: service.basePrice, customerId }
    });
    res.json({ quoteId: quote.id, price: Number(quote.price) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal error' });
  }
}
