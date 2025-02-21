import express, { Express } from "express";
import dotenv from "dotenv";
import TodoRouter from "./routes/todos.route";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/", TodoRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
