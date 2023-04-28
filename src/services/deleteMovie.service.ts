import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const deleteMovieService = async (
  movieId: number
): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOneBy({
    id: movieId
  })

  if(!findMovie){
    throw new AppError("Movie not found", 404)
  }

 await movieRepository.remove(findMovie)
  
};
export default deleteMovieService;
