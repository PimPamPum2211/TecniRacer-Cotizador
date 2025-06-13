import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

const bodySchema = z.object({
  serviceId: z.string(),
  customer: z.string(),
  phone: z.string(),
  scheduled: z.string()
});

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

  try {
    const appointment = await prisma.appointment.create({
      data: {
        serviceId: data.serviceId,
        customer: data.customer,
        phone: data.phone,
        scheduled: new Date(data.scheduled)
      }
    });
    res.json({ appointmentId: appointment.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
}
