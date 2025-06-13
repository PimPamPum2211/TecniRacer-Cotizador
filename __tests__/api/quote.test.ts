import handler from '../../pages/api/quote';
import { createMocks } from 'node-mocks-http';
import { prisma } from '../../lib/prisma';

jest.mock('../../lib/prisma', () => ({
  prisma: {
    quote: { create: jest.fn() }
  }
}));

describe('POST /api/quote', () => {
  it('returns 400 for invalid body', async () => {
    const { req, res } = createMocks({ method: 'POST', body: {} });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('creates quote for valid service', async () => {
    (prisma.quote.create as jest.Mock).mockResolvedValue({ id: '1', price: 500 });
    const { req, res } = createMocks({
      method: 'POST',
      body: { serviceId: 'oil-change' }
    });
    await handler(req, res);
    expect(prisma.quote.create).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
});
