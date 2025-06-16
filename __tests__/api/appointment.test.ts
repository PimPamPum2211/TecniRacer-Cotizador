import handler from '../../pages/api/appointment';
import { createMocks } from 'node-mocks-http';

jest.mock('../../lib/prisma', () => ({
  prisma: {
    appointment: {
      findFirst: jest.fn(),
      create: jest.fn(async ({ data }) => ({ id: 'a1' }))
    },
    customer: {
      upsert: jest.fn(async () => ({ id: 'c1' }))
    }
  }
}));

const { prisma } = require('../../lib/prisma');

describe('/api/appointment', () => {
  it('GET missing fields', async () => {
    const { req, res } = createMocks({ method: 'GET', query: {} });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(400);
  });

  it('GET returns appointment', async () => {
    prisma.appointment.findFirst.mockResolvedValue({
      id: 'a1',
      serviceId: 's1',
      customerId: 'c1',
      plate: 'ABC',
      document: '123',
      scheduled: new Date(),
      createdAt: new Date(),
      service: {},
      customer: { name: 'Test', phone: '5551234' }
    });
    const { req, res } = createMocks({ method: 'GET', query: { plate: 'ABC', document: '123' } });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
  });

  it('POST creates appointment', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { serviceId: 's1', customer: 'test', phone: '5551234', plate: 'ABC', document: '123', scheduled: '2024-01-01T10:00' }
    });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    expect(prisma.appointment.create).toHaveBeenCalled();
  });
});
