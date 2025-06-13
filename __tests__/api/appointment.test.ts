import handler from '../../pages/api/appointment';
import { createMocks } from 'node-mocks-http';
import { prisma } from '../../lib/prisma';

jest.mock('../../lib/prisma', () => ({
  prisma: {
    appointment: { create: jest.fn() }
  }
}));

describe('POST /api/appointment', () => {
  it('returns 400 for invalid body', async () => {
    const { req, res } = createMocks({ method: 'POST', body: {} });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('creates appointment for valid body', async () => {
    (prisma.appointment.create as jest.Mock).mockResolvedValue({ id: '1' });
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        serviceId: 'oil-change',
        customer: 'John',
        phone: '5555',
        scheduled: '2024-01-01T00:00:00.000Z'
      }
    });
    await handler(req, res);
    expect(prisma.appointment.create).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
});
