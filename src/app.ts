import express from "express";
import { startDataBase } from "./database";
import { createMovie, deleteMovie, findMovie, readMoviesAll, updateMovie } from "./logic";
import { filterCategoryMovies, verifyMovieExist, verifyNameMovieExist } from "./middlewares";

const api = express();
const PORT: number = 3000;
const message = `Server is running in http://localhost:${PORT}`;

api.use(express.json());

api.get("/movies", filterCategoryMovies, readMoviesAll);
api.get("/movies/:id",verifyMovieExist, findMovie)
api.post("/movies", verifyNameMovieExist, createMovie);
api.patch("/movies/:id", verifyMovieExist, verifyNameMovieExist, updateMovie);
api.delete("/movies/:id", verifyMovieExist, deleteMovie)

api.listen(PORT, async () => {
  await startDataBase();
  console.log(message);
});
