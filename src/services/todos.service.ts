import { DeleteResult, Repository } from "typeorm";
import { dataSource } from "../data-source";
import { Todos } from "../entity/todos.entity";
import {
  CreateTodoDTO,
  UpdateTodoDTO,
} from "./todo/validation/todo.validation";

export class TodoService {
  private todosRepository: Repository<Todos>;
  constructor() {
    this.todosRepository = dataSource.getRepository(Todos);
  }
  getAllTodos = async (): Promise<Todos[]> => {
    return await this.todosRepository.find();
  };

  createTodo = async (data: CreateTodoDTO): Promise<Todos | null> => {
    const newTodo: Todos = this.todosRepository.create(data);
    return await this.todosRepository.save(newTodo);
  };

  updateTodo = async (
    id: number,
    data: UpdateTodoDTO
  ): Promise<Todos | null> => {
    const todo: Todos | null = await this.todosRepository.findOneBy({ id });
    if (!todo) return null;
    Object.assign(todo, data);
    return await this.todosRepository.save(todo);
  };

  deleteTodo = async (id: number): Promise<boolean> => {
    const deleteResult: DeleteResult = await this.todosRepository.delete(id);
    return deleteResult.affected === 1;
  };
}
