import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  duration: z.number().int().positive(),
  description: z.string().nullish(),
  price: z.number().int().positive(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const moviesSchemaResponse = z.array(movieSchema)

const movieSchemaUpdateRequest = movieSchemaRequest.partial()

const listMovieSchema = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: z.array(movieSchema)
})

export { movieSchema, movieSchemaRequest,moviesSchemaResponse,movieSchemaUpdateRequest, listMovieSchema };
