import handler from '../../pages/api/quote';
import { createMocks } from 'node-mocks-http';
import services from '../../data/services.json';

jest.mock('../../lib/prisma', () => {
  const data = require('../../data/services.json');
  const mock = {
    quote: {
      create: jest.fn(async ({ data }) => ({ id: 'q1', price: data.price }))
    },
    customer: {
      upsert: jest.fn()
    },
    service: {
      findUnique: jest.fn(async () => ({ id: 'srv1', basePrice: data[0].basePrice }))
    }
  };
  return { prisma: mock };
});

describe('POST /api/quote', () => {
  it('returns 400 when serviceId is missing', async () => {
    const { req, res } = createMocks({ method: 'POST', body: {} });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(400);
  });

  it('creates quote and returns price', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { serviceId: services[0].slug }
    });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData() as string);
    expect(data.quoteId).toBe('q1');
    expect(data.price).toBe(services[0].basePrice);
  });
});
