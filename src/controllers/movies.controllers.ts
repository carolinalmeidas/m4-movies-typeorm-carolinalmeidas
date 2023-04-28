import { Request, Response } from "express";
import createMoviesService from "../services/createMovies.service";
import {
  TMovieUpadateRequest,
  TMoviesRequest,
  TMovieListRequest,
} from "../interfaces/movices.interfaces";
import listMovieService from "../services/listMovies.service";
import updateMovieService from "../services/updateMovies.service";
import deleteMovieService from "../services/deleteMovie.service";

const createMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMoviesRequest = req.body;

  const newMovie = await createMoviesService(movieData);

  return res.status(201).json(newMovie);
};
const listMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const page: number = Number(req.query.page) || 1;
  const perPage: number = Number(req.query.perPage) || 5;

  const sort: string = req.query.sort === undefined ? "id" : String(req.query.sort);

  const order: string = req.query.order === undefined ? "asc" : String(req.query.order);

  await listMovieService(page, perPage, sort, order)

  const movies: TMovieListRequest = await listMovieService(
    page,
    perPage,
    sort,
    order
  );
  return res.status(200).json(movies);
};

const updateMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);
  const movieDate: TMovieUpadateRequest = req.body;
  const movie = await updateMovieService(movieDate, movieId);

  return res.json(movie);
};

const deleteMovieControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  await deleteMovieService(id);

  return res.status(204).send();
};

export {
  createMoviesControllers,
  listMoviesControllers,
  updateMoviesControllers,
  deleteMovieControllers,
};
