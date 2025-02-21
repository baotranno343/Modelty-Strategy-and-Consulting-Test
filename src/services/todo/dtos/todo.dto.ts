import { Todos } from "../../../entity/todos.entity";

export class TodoResponseDTO {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;

  constructor(id: number, name: string, startDate?: Date, endDate?: Date) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static fromEntity(todo: Todos): TodoResponseDTO {
    return new TodoResponseDTO(
      todo.id,
      todo.name,
      todo.startDate,
      todo.endDate
    );
  }
}
