import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { serviceId, customer, phone, scheduled } = req.body as {
    serviceId?: string;
    customer?: string;
    phone?: string;
    scheduled?: string;
  };

  if (!serviceId || !customer || !phone || !scheduled) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (!/^[0-9]{7,}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone' });
  }

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
