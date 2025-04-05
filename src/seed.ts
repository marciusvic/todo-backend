import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@olhar180.com' },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: 'admin@olhar180.com',
        password: 'admin123',
        name: 'Olhar180 Admin',
        role: 'ADMIN',
      },
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists. Skipping creation.');
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
