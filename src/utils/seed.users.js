import { prisma } from "../configs/prisma.js"
import { faker } from '@faker-js/faker';

async function seed() {
  
  console.log("Generating users...");

  // Create users with random join dates from the last year
  for (let i = 0; i < 1000000; i++) {
    await prisma.users.create({
      data: {
        username: faker.internet.username(),
        createdAt: faker.date.past({ years: 1 }), 
      },
    });
  }

  console.log("Seeded random users to db!");
  
}

seed();