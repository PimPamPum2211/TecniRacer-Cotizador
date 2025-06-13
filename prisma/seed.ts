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
        basePrice: service.basePrice,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
