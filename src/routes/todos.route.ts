import { Router } from "express";
import { TodoController } from "../controllers/todos.controller";

export class TodoRouter {
  public router: Router;
  private todoController: TodoController;

  constructor() {
    this.router = Router();
    this.todoController = new TodoController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/", this.todoController.getAllTodos);
    this.router.post("/", this.todoController.createTodo);
    this.router.put("/:id", this.todoController.updateTodo);
    this.router.delete("/:id", this.todoController.deleteTodo);
  };
}

export default new TodoRouter().router;
