import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import express from "express";

const authorsJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "author.json"
);
const getAuthors = () => JSON.parse(fs.readFileSync(authorsJsonPath));
const rewriteAuthors = (contentData) =>
  fs.writeFileSync(authorsJsonPath, JSON.stringify(contentData));

const authorsRouter = express.Router();

// const filePath = fileURLToPath(import.meta.url)
// const folderPath = dirname(filePath)
// const jsonFilePath = join(folderPath, "authors.json")

authorsRouter.get("/", (req, res) => {
  const authors = getAuthors();
  console.log(authors);

  res.send(authors);
});

authorsRouter.get("/:authorId", (req, res) => {
  const authors = getAuthors();
  const author = authors.find((author) => author.id === req.params.authorId);
  res.send(author);
});

authorsRouter.post("/", (req, res) => {
  const newAuthor = { ...req.body, id: uniqid() };
  // console.log(newAuthor)
  const authors = getAuthors();
  authors.push(newAuthor);
  rewriteAuthors(authors);
  res.status(201).send(newAuthor);
});

authorsRouter.put("/:authorId", (req, res) => {
  const authors = getAuthors();
  const index = authors.findIndex(
    (author) => author.id === req.params.authorId
  );

  const authorToModify = authors[index];
  const updatedFields = req.body;

  const updatedAuthor = { ...authorToModify, ...updatedFields };

  authors[index] = updatedAuthor;

  rewriteAuthors(authors);

  res.send(updatedAuthor);
});

authorsRouter.delete("/:authorId", (req, res) => {
  const authors = getAuthors();
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.authorId
  );
  rewriteAuthors(remainingAuthors);
  res.status(204).send();
});

export default authorsRouter;
