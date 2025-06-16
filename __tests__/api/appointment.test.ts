import handler from '../../pages/api/appointment';
import { createMocks } from 'node-mocks-http';

jest.mock('../../lib/prisma', () => {
  const mock = {
    appointment: {
      findFirst: jest.fn(),
      create: jest.fn(async () => ({ id: 'a1' }))
    },
    customer: {
      upsert: jest.fn(async () => ({ id: 'c1' }))
    },
    service: {
      findUnique: jest.fn(async () => ({ id: 'srv1' }))
    },
    $transaction: jest.fn(async (cb) => cb(mock))
  };
  return { prisma: mock };
});

const { prisma } = require('../../lib/prisma');

describe('/api/appointment', () => {
  it('GET missing fields', async () => {
    const { req, res } = createMocks({ method: 'GET', query: {} });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(400);
  });

  it('GET returns appointment', async () => {
    prisma.appointment.findFirst.mockResolvedValue({ id: 'a1' });
    const { req, res } = createMocks({ method: 'GET', query: { plate: 'ABC', document: '123' } });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
  });

  it('POST creates appointment', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { serviceId: 'oil-change', customer: 'test', phone: '5551234', plate: 'ABC', document: '123', scheduled: '2099-01-01T10:00' }
    });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    expect(prisma.appointment.create).toHaveBeenCalled();
  });
});
