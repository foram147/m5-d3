import express from "express";
import authorsRouter from "./services/authors/index.js";
import postsRouter from "./services/posts/index.js";
import listEndpoints from "express-list-endpoints";
import {
  badRequest,
  forbidden,
  notFound,
  serverError,
} from "./errorHandler.js";
// import cors from "cors";

const server = express();
const port = 3000;

server.use(express.json());
// server.use(cors())

server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);
console.table(listEndpoints(server));

// error handlers
server.use(badRequest);
server.use(forbidden);
server.use(notFound);
server.use(serverError);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
