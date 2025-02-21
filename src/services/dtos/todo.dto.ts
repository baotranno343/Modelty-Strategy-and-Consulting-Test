import { z } from "zod";
import { Todos } from "../../entity/todos.entity";
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const CreateTodoSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 characters")
      .max(80, "Name max 80 characters"),
    startDate: z
      .string()
      .regex(dateRegex, "startDate must be in YYYY-MM-DD format")
      .optional(),
    endDate: z
      .string()
      .regex(dateRegex, "endDate must be in YYYY-MM-DD format")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.endDate && !data.startDate) {
        return false;
      }
      return true;
    },
    {
      message: "startDate is required if endDate is provided",
      path: ["startDate"],
    }
  );

export const UpdateTodoSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 characters")
      .max(80, "Name max 80 characters")
      .optional(),
    startDate: z
      .string()
      .regex(dateRegex, "startDate must be in YYYY-MM-DD format")
      .optional(),
    endDate: z
      .string()
      .regex(dateRegex, "endDate must be in YYYY-MM-DD format")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.endDate && !data.startDate) {
        return false;
      }
      return true;
    },
    {
      message: "startDate is required if endDate is provided",
      path: ["startDate"],
    }
  );

export type CreateTodoDTO = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof UpdateTodoSchema>;
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
