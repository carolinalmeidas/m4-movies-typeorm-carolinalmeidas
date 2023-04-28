import { Router } from "express";
import { createMoviesControllers, deleteMovieControllers, listMoviesControllers, updateMoviesControllers } from "../controllers/movies.controllers";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares.";
import { movieSchemaRequest, movieSchemaUpdateRequest } from "../schemas/movies.schema";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddlewares(movieSchemaRequest),
  createMoviesControllers
);

userRoutes.get("", listMoviesControllers)
userRoutes.patch("/:id", ensureDataIsValidMiddlewares(movieSchemaUpdateRequest), updateMoviesControllers)

userRoutes.delete("/:id", deleteMovieControllers)

export default userRoutes;
