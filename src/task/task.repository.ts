import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }

  async findMany(params: { where?: Prisma.TaskWhereInput }) {
    const { where } = params;
    return this.prisma.task.findMany({ where });
  }

  async findOne(
    TaskUniqueInput: Prisma.TaskWhereUniqueInput,
    select?: Prisma.TaskSelect,
  ) {
    return this.prisma.task.findUnique({
      where: TaskUniqueInput,
      select,
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
