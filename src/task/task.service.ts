import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.taskRepository.create({ ...createTaskDto, userId });
  }

  async findAll(where = {}) {
    return this.taskRepository.findMany({ where });
  }

  async findAllForAdmin(where = {}) {
    return this.taskRepository.findAdminMany({ where });
  }

  async findOne(id: number, userId: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.userId !== userId) {
      throw new Error('You do not have permission to access this task');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.userId !== user.id && user.role !== 'ADMIN') {
      throw new Error('You do not have permission to update this task');
    }
    return this.taskRepository.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, user: User) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.userId !== user.id && user.role !== 'ADMIN') {
      throw new Error('You do not have permission to delete this task');
    }
    return this.taskRepository.delete({
      where: { id },
    });
  }
}
