import { prisma } from "../configs/prisma.js";
import { faker } from '@faker-js/faker';

async function seedFollows() {
  try {
    const allUsers = await prisma.users.findMany({ select: { id: true } });
    
    if (allUsers.length < 2) {
      console.error("❌ Not enough users to create follows.");
      return;
    }

    console.log("Generating follow relationships...");

    const followsData = [];
    const usedPairs = new Set(); // To prevent duplicate primary keys

    while (followsData.length < 2000) {
      // Pick two random users
      const follower = allUsers[Math.floor(Math.random() * allUsers.length)];
      const followee = allUsers[Math.floor(Math.random() * allUsers.length)];

      // Logic: 1. Don't follow self. 2. Don't repeat the same pair.
      const pairId = `${follower.id}-${followee.id}`;

      if (follower.id !== followee.id && !usedPairs.has(pairId)) {
        usedPairs.add(pairId);
        followsData.push({
          followerId: follower.id,
          followeeId: followee.id,
          createdAt: faker.date.past({ years: 1 }),
        });
      }
    }

    await prisma.follows.createMany({
      data: followsData,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${followsData.length} follow relations!`);
  } catch (error) {
    console.error("❌ Error seeding follows:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFollows();