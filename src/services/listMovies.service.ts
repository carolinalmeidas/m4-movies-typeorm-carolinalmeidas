import { Repository } from "typeorm";
import { TMovieListRequest } from "../interfaces/movices.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const listMovieService = async (
  page: number,
  perPage: number,
  sort: string,
  order: string
): Promise<TMovieListRequest> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
  let orderObj = {};

  if(sort === "id"){
    order = "asc"
    orderObj = {
      id: [order]
    }
  }

  if (sort !== "price" || "duration") {
    orderObj = {
      id: "asc",
    };
  }

  if (sort == "price" || "duration" && !order) {
    orderObj = {
      [sort]: "asc",
    };
  }

  if (sort == "price" || "duration" && order) {
    if (order === "desc") {
      orderObj = {
        [sort]: "desc",
      };
    } else {
      orderObj = {
        [sort]: "asc",
      };
    }
  }

  if (perPage <= 0 || perPage > 5 || page <= 0) {
    perPage = 5;
    page = 1;
  }

  const [movies, count] = await movieRepository.findAndCount({
    order: orderObj,
    take: perPage,
    skip: (page - 1) * perPage,
  });

  let prevPage: string | null = null;
  let nextPage: string | null = null;

  const totalPages = Math.ceil(count / perPage);

  if (page > 1) {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  } else {
    prevPage = null;
  }

  if (page < totalPages) {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  } else {
    nextPage = null;
  }

  const info = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: movies,
  };

  return info;
};

export default listMovieService;
