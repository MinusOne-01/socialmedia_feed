import { Worker } from "bullmq";
import { redis } from "../configs/redis.js";
import { handleFanout } from "../utils/feedFanOut.js";


new Worker(
  "feed-fanout",
  async job => {
    if (job.name === "fanout") {
        console.log("worker here...")
      await handleFanout(job.data);
    }
  },
  {
    connection: redis,
    concurrency: 5
  }
);
