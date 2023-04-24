import app from "./app";
import { AppDatSource } from "./data-source";

AppDatSource.initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));
