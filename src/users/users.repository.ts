import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.UsersCreateInput) {
    return this.prismaService.users.create({
      data,
    });
  }

  createMany(data: Prisma.UsersCreateManyInput[]) {
    return this.prismaService.users.createMany({
      data,
    });
  }

  async findOne(
    UserUniqueInput: Prisma.UsersWhereUniqueInput,
    select?: Prisma.UsersSelect,
  ) {
    return this.prismaService.users.findUnique({
      where: UserUniqueInput,
      select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    select?: Prisma.UsersSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.prismaService.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async update(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.users.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.UsersWhereUniqueInput) {
    return this.prismaService.users.delete({
      where,
    });
  }
}
