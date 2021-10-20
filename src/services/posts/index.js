import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import express from "express";

const postsJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "posts.json"
);
const getPosts = () => JSON.parse(fs.readFileSync(postsJsonPath));
const rewritePosts = (contentData) =>
  fs.writeFileSync(postsJsonPath, JSON.stringify(contentData));

const postsRouter = express.Router();

// const filePath = fileURLToPath(import.meta.url)
// const folderPath = dirname(filePath)
// const jsonFilePath = join(folderPath, "authors.json")

postsRouter.get("/", (request, response) => {
  const posts = getPosts();
  console.log(posts);

  response.send(posts);
});

postsRouter.get("/:postId", (req, res) => {
  const posts = getPosts();
  const post = posts.find((post) => post.id === req.params.postId);
  res.send(author);
});

postsRouter.post("/", (req, res) => {
  const newPost = { ...req.body, id: uniqid() };
  // console.log(newAuthor)
  const posts = getPosts();
  posts.push(newPost);
  rewritePosts(posts);
  res.status(201).send(newPost);
});

postsRouter.put("/:postId", (req, res) => {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === req.params.postId);

  const postToModify = posts[index];
  const updatedFields = req.body;

  const updatedPost = { ...postToModify, ...updatedFields };

  posts[index] = updatedPost;

  rewritePosts(posts);

  res.send(updatedPost);
});

postsRouter.delete("/:postId", (req, res) => {
  const posts = getPosts();
  const remainingPosts = posts.filter((post) => post.id !== req.params.postId);
  rewritePosts(remainingPosts);
  res.status(204).send();
});

export default postsRouter;
