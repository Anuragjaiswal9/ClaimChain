import { server } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
    server.on("error", () => {
      console.log("ERROR: ", error);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });
