import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import services from '../../data/services.json';
import { prisma } from '../../lib/prisma';

const bodySchema = z.object({ serviceId: z.string() });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  let data: z.infer<typeof bodySchema>;
  try {
    data = bodySchema.parse(req.body);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request', details: err });
  }

  const service = services.find((s) => s.id === data.serviceId);
  if (!service) return res.status(404).end();

  try {
    const quote = await prisma.quote.create({
      data: { serviceId: data.serviceId, price: service.basePrice }
    });
    res.json({ quoteId: quote.id, price: quote.price });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create quote' });
  }
}
