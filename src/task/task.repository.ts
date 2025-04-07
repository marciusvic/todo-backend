import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    title,
    description,
    dueDate,
    priority,
    userId,
  }: CreateTaskDto & { userId: number }) {
    if (!title || !description || !dueDate || !priority) {
      throw new Error('Missing required fields');
    }

    return this.prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        userId,
      },
    });
  }

  async findMany(params: { where?: Prisma.TaskWhereInput }) {
    const { where } = params;
    return this.prisma.task.findMany({ where });
  }

  async findOne(id: number) {
    return this.prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.task.update({
      where,
      data,
    });
  }

  async delete(params: { where: Prisma.TaskWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.task.delete({ where });
  }
}
