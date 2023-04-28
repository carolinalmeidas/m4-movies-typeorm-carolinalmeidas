import { z } from "zod";
import {
  listMovieSchema,
  movieSchema,
  movieSchemaRequest,
  moviesSchemaResponse,
} from "../schemas/movies.schema";
import { DeepPartial } from "typeorm";




type TMoviesRequest = z.infer<typeof movieSchemaRequest>;

type TMovieResponse = z.infer<typeof movieSchema>;

type TMoviesResponse = z.infer<typeof moviesSchemaResponse>;

type TMovieUpadateRequest = DeepPartial<TMoviesRequest>;

type TMovieListRequest = z.infer< typeof listMovieSchema>

export {
  TMoviesRequest,
  TMovieResponse,
  TMoviesResponse,
  TMovieUpadateRequest,
  TMovieListRequest
};
