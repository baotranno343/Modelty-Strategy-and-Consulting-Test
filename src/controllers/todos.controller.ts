import { Request, Response } from "express";
import { TodoService } from "../services/todo/todos.service";
import { TodoResponseDTO } from "../services/todo/dtos/todo.dto";
import { Todos } from "../entity/todos.entity";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
} from "../services/todo/validation/todo.validation";
import { successResponse, errorResponse } from "../helpers/response.helper";

export class TodoController {
  private todoService: TodoService;
  constructor() {
    this.todoService = new TodoService();
  }

  getAllTodos = async (req: Request, res: Response) => {
    try {
      const list: Todos[] = await this.todoService.getAllTodos();
      successResponse<TodoResponseDTO[]>(
        res,
        "Fetched todos successfully",
        list.map(TodoResponseDTO.fromEntity)
      );
      return;
    } catch (error) {
      errorResponse(res, "Internal server error", 500);
      return;
    }
  };

  createTodo = async (req: Request, res: Response) => {
    try {
      const validate = CreateTodoSchema.safeParse(req.body);
      if (!validate.success) {
        return errorResponse(res, validate.error.format(), 400);
      }
      const newTodo: Todos | null = await this.todoService.createTodo(
        validate.data
      );
      if (!newTodo) {
        return errorResponse(res, "Create todo failed", 500);
      }
      return successResponse<TodoResponseDTO>(
        res,
        "Todo created successfully",
        TodoResponseDTO.fromEntity(newTodo),
        201
      );
    } catch (error) {
      return errorResponse(res, "Internal server error", 500);
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = UpdateTodoSchema.safeParse(req.body);
      if (!result.success) {
        return errorResponse(res, result.error.format(), 400);
      }
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return errorResponse(res, "Invalid ID format", 400);
      }
      const updatedTodo: Todos | null = await this.todoService.updateTodo(
        parsedId,
        result.data
      );
      if (!updatedTodo) {
        return errorResponse(res, "To-do not found", 404);
      }
      return successResponse<TodoResponseDTO>(
        res,
        "Todo updated successfully",
        TodoResponseDTO.fromEntity(updatedTodo)
      );
    } catch (error) {
      return errorResponse(res, "Internal server error", 500);
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return errorResponse(res, "Invalid ID format", 400);
      }
      const isDeleted = await this.todoService.deleteTodo(parsedId);
      if (!isDeleted) {
        return errorResponse(res, "To-do not found", 404);
      }
      return successResponse(res, "Todo deleted successfully");
    } catch (error) {
      return errorResponse(res, "Internal server error", 500);
    }
  };
}
