import { prisma } from "../configs/prisma.js"
import { faker } from '@faker-js/faker';
import { feedQueue } from "../queue/feed.queue.js";

async function post() {
  
  // fetch all users from db  
  const allUsers = await prisma.users.findMany({
    select: { id: true, createdAt: true }
  });

  if (allUsers.length === 0) {
    console.error("No users found. Seed users before seeding posts!");
    return;
  }

  console.log(`Seeding posts for ${allUsers.length} users...`);

  // Create user records
  await prisma.posts.createMany({
      data: Array.from({ length: 1000 }).map(() => {
          const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
          return {
                content: faker.lorem.sentence(),
                userId: randomUser.id,
                createdAt: faker.date.recent(),
          };
      }),
  });

  const posts = await prisma.posts.findMany({
    select: { id: true, userId: true, createdAt: true }
  });

  console.log(`Enqueuing ${posts.length} fanout jobs...`);

  // 3. Use a for...of loop to handle async await correctly
  for (const post of posts) {
      feedQueue.add("fanout", {
      postId: post.id,
      authorId: post.userId,
      createdAt: post.createdAt.toISOString()
    });
  }

  console.log("Seeding posts done!");
  
}

post();