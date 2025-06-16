import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { plate, document } = req.query as { plate?: string; document?: string };
    if (!plate || !document) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    try {
      const appointment = await prisma.appointment.findFirst({
        where: { plate, document },
        include: { service: true }
      });
      if (!appointment) return res.status(404).end();
      return res.json(appointment);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  if (req.method !== 'POST') return res.status(405).end();

  const schema = z.object({
    serviceId: z.string(),
    customer: z.string(),
    phone: z.string().regex(/^[0-9]{7,}$/),
    plate: z.string(),
    document: z.string(),
    scheduled: z.string()
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const { serviceId, customer, phone, plate, document, scheduled } = parsed.data;

  try {
    const customerRecord = await prisma.customer.upsert({
      where: { phone },
      update: { name: customer },
      create: { name: customer, phone }
    });

    const appointment = await prisma.appointment.create({
      data: {
        serviceId,
        customer,
        customerId: customerRecord.id,
        phone,
        plate,
        document,
        scheduled: new Date(scheduled)
      }
    });
    res.json({ appointmentId: appointment.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal error' });
  }
}
