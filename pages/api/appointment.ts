import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { serviceId, customer, phone, scheduled } = req.body as {
    serviceId: string;
    customer: string;
    phone: string;
    scheduled: string;
  };

  const appointment = await prisma.appointment.create({
    data: {
      serviceId,
      customer,
      phone,
      scheduled: new Date(scheduled)
    }
  });
  res.json({ appointmentId: appointment.id });
}
