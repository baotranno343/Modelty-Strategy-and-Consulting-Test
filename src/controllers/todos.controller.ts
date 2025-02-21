import { Request, Response } from "express";
import { TodoService } from "../services/todos.service";
import { TodoResponseDTO } from "../services/todo/dtos/todo.dto";
import { Todos } from "../entity/todos.entity";
import asyncHandler from "express-async-handler";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
} from "../services/todo/validation/todo.validation";
export class TodoController {
  private todoService: TodoService;
  constructor() {
    this.todoService = new TodoService();
  }
  getAllTodos = asyncHandler(async (req: Request, res: Response) => {
    const list: Todos[] = await this.todoService.getAllTodos();
    res.json(list.map(TodoResponseDTO.fromEntity));
  });

  createTodo = asyncHandler(async (req: Request, res: Response) => {
    const validate = CreateTodoSchema.safeParse(req.body);
    if (!validate.success) {
      res.status(400).json({ error: validate.error.format() });
      return;
    }
    const newTodo: Todos | null = await this.todoService.createTodo(
      validate.data
    );
    if (!newTodo) {
      res.status(404).json({ message: "Create todo failed" });
      return;
    }
    res.status(201).json(TodoResponseDTO.fromEntity(newTodo));
  });

  updateTodo = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = UpdateTodoSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      res.status(404).json({ message: "Please input id" });
      return;
    }
    const updatedTodo: Todos | null = await this.todoService.updateTodo(
      parsedId,
      result.data
    );
    if (!updatedTodo) {
      res.status(404).json({ message: "To-do not found" });
      return;
    }
    res.status(200).json({
      message: "Todo updated successfully",
      data: TodoResponseDTO.fromEntity(updatedTodo),
    });
  });

  deleteTodo = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      res.status(404).json({ message: "Please input id" });
      return;
    }
    const isDeleted = await this.todoService.deleteTodo(parsedId);
    if (!isDeleted) {
      res.status(404).json({ message: "To-do not found" });
      return;
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  });
}
