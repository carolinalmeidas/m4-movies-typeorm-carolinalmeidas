import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import {
  TMoviesRequest,
  TMovieResponse,
} from "../interfaces/movices.interfaces";
import { AppError } from "../error";

const createMoviesService = async (
  movieData: TMoviesRequest
): Promise<TMovieResponse> => {

  const movieRepository: Repository<TMovieResponse> = 
  AppDataSource.getRepository(Movie);

  const findNameMovieData =
  await movieRepository.findOneBy({
    name: movieData.name
  });

  if (findNameMovieData) {
    throw new AppError("Movie already exists.", 409);
  }

  const movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  return movie;
};

export default createMoviesService;
