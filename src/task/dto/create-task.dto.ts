import { Priority } from '@prisma/client';

export class CreateTaskDto {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  userId?: number;
}
