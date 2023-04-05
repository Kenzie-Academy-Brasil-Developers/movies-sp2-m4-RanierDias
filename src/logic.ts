import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import { TRequestExpress, IMovies } from "./interfaces";
import format from "pg-format";

export const readMoviesAll: TRequestExpress = async (req, res) => {
  const queryText: string = "SELECT * FROM movies;";

  try {
    const queryResult: QueryResult<IMovies> = await client.query(queryText);
    const listMovies: IMovies[] = queryResult.rows;

    return res.status(200).json(listMovies);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findMovie: TRequestExpress = async (req, res) => {
  const movie: IMovies = res.locals.movie;

  return res.status(200).json(movie);
};

export const createMovie: TRequestExpress = async (req, res) => {
  const listIdentifiers = Object.keys(req.body);
  const listLiteral: Array<string | number | boolean> = Object.values(req.body);

  const queryText = format(
    `
  INSERT INTO movies (%I)
  VALUES (%L)
  RETURNING *;
  `,
    listIdentifiers,
    listLiteral
  );

  try {
    const response: QueryResult<IMovies> = await client.query(queryText);
    const movie = response.rows[0];

    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMovie: TRequestExpress = async (req, res) => {
  const { body: data, params } = req;
  const listIdentifiers = Object.keys(data);
  const listLiteral = Object.values(data);

  const queryText = format(
    `
  UPDATE movies
  SET (%I) = ROW(%L)
  WHERE id = $1
  RETURNING *;
  `,
    listIdentifiers,
    listLiteral
  );
  const queryConfig: QueryConfig = {
    text: queryText,
    values: [params.id],
  };

  try {
    const response: QueryResult<IMovies> = await client.query(queryConfig);
    const movie = response.rows[0];

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMovie: TRequestExpress = async (req, res) => {
  const { params } = req;

  const queryText: string = `
  DELETE FROM movies
  WHERE id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryText,
    values: [params.id],
  };

  try {
    await client.query(queryConfig);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
