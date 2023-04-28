import { Repository } from "typeorm";
import { Movie } from "../entities";
import {
  TMovieResponse,
  TMovieUpadateRequest,
} from "../interfaces/movices.interfaces";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const updateMovieService = async (
  movieData: TMovieUpadateRequest,
  movieId: number
): Promise<TMovieResponse> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  if(movieData.name){
    const findNameMovieData =
    await movieRepository.findOneBy({
      name: movieData.name
    });
  
    if (findNameMovieData) {
      throw new AppError("Movie already exists.", 409);
    }
  
  }

  const oldMovieData: Movie | undefined | null =
    await movieRepository.findOneBy({
      id: movieId,
    });

  if (!oldMovieData) {
    throw new AppError("Movie not found", 404);
  }

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(newMovieData);

  return newMovieData;
};
export default updateMovieService;
