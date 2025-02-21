import { DataSource } from "typeorm";
import { Todos } from "./entity/todos.entity";

export const dataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [Todos],
  synchronize: true,
  dropSchema: true,
});
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
