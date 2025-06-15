import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { plate, document } = req.query as { plate?: string; document?: string };
    if (!plate || !document) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const appointment = await prisma.appointment.findFirst({
      where: { plate, document },
      include: { service: true }
    });
    if (!appointment) return res.status(404).end();
    return res.json(appointment);
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { serviceId, customer, phone, plate, document, scheduled } = req.body as {
    serviceId?: string;
    customer?: string;
    phone?: string;
    plate?: string;
    document?: string;
    scheduled?: string;
  };

  if (!serviceId || !customer || !phone || !plate || !document || !scheduled) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (!/^[0-9]{7,}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone' });
  }

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
}
