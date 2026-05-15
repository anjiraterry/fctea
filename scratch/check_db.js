const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const placeCount = await prisma.place.count();
  const eventCount = await prisma.event.count();
  const userCount = await prisma.user.count();
  console.log(`Places: ${placeCount}`);
  console.log(`Events: ${eventCount}`);
  console.log(`Users: ${userCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
