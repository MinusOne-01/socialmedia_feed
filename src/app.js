import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import postRoutes from "./modules/posts/post.routes.js"
import userRoutes from "./modules/users/user.routes.js"
import followRoutes from "./modules/follows/follow.routes.js"
import likeRoutes from "./modules/likes/like.routes.js"
import commentRoutes from "./modules/comments/comment.routes.js"

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/follow", followRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);

app.use(errorHandler);


export default app;