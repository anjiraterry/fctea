const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting to DB...");
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Result:", result);
    await prisma.$disconnect();
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  }
}

test();
