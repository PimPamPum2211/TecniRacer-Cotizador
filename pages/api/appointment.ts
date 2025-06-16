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
    phone: z.string().regex(/^\d{7,10}$/),
    plate: z.string(),
    document: z.string(),
    scheduled: z
      .string()
      .pipe(z.coerce.date())
      .refine((d) => d > new Date(), { message: 'Debe ser futura' })
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const { serviceId, customer, phone, plate, document, scheduled } = parsed.data;

  try {
    const service = await prisma.service.findUnique({ where: { slug: serviceId } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const appointment = await prisma.$transaction(async (tx) => {
      const customerRecord = await tx.customer.upsert({
        where: { phone },
        update: { name: customer },
        create: { name: customer, phone }
      });

      return tx.appointment.create({
        data: {
          serviceId: service.id,
          customer,
          customerId: customerRecord.id,
          phone,
          plate,
          document,
          scheduled
        }
      });
    });
    res.json({ appointmentId: appointment.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal error' });
  }
}
