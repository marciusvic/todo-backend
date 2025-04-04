import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto);
  }

  async findAll(params?: { where?: Prisma.TaskWhereInput }) {
    return this.taskRepository.findMany(params);
  }

  async findOne(
    TaskUniqueInput: Prisma.TaskWhereUniqueInput,
    select?: Prisma.TaskSelect,
  ) {
    return this.taskRepository.findOne(TaskUniqueInput, select);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.taskRepository.delete({
      where: { id },
    });
  }
}
