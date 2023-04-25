import "reflect-metadata"
import "express-async-errors"
import express,  { Application } from "express";
import { handleErros } from "./error";

const app: Application = express()

app.use(express.json())

app.use(handleErros)

export default app