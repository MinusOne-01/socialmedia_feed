// queues/feed.queue.ts
import { Queue } from "bullmq";
import { redis } from "../configs/redis.js"

export const feedQueue = new Queue("feed-fanout", {
  connection: redis
});
