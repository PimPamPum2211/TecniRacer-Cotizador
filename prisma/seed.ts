import { prisma } from '../lib/prisma';
import services from '../data/services.json';

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        name: service.name,
        icon: service.icon,
        image: service.image,
        basePrice: service.basePrice,
      },
    });
  }

  await prisma.customer.upsert({
    where: { phone: '5551234' },
    update: {},
    create: { name: 'Ejemplo', phone: '5551234' }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
