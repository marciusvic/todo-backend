import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: Prisma.UsersCreateInput) {
    const userWithEmail = await this.usersRepository.findOne({
      email: data.email,
    });

    if (userWithEmail) {
      throw new ConflictException({
        message: 'This email is already taken',
        toast: 'O e-mail não poder ser utilizado. Tente outro.',
      });
    }
    data.password = await bcrypt.hash(data.password, this.saltRounds);
    return this.usersRepository.create(data);
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    select?: Prisma.UsersSelect;
  }) {
    return this.usersRepository.findMany(params || {});
  }

  async findOne(
    UserUniqueInput: Prisma.UsersWhereUniqueInput,
    select?: Prisma.UsersSelect,
  ) {
    return this.usersRepository.findOne(UserUniqueInput, select);
  }

  async update(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where } = params;
    const { email, id } = where;

    if (email) {
      const userWithEmail = await this.usersRepository.findOne({
        email,
      });
      if (!userWithEmail) {
        throw new ConflictException({
          message: 'This email is already taken',
          toast: 'O e-mail não poder ser utilizado. Tente outro.',
        });
      }
    }

    if (id) {
      const userWithId = await this.usersRepository.findOne({
        id,
      });
      if (!userWithId) {
        throw new ConflictException({
          message: 'This user does not exist',
          toast: 'Este usuário não existe.',
        });
      }
    }

    delete params.data.email;
    return this.usersRepository.update(params);
  }

  async remove(where: Prisma.UsersWhereUniqueInput) {
    const { id, email } = where;

    if (id) {
      const userWithId = await this.usersRepository.findOne({
        id,
      });
      if (!userWithId) {
        throw new NotFoundException({
          message: 'This user does not exist',
          toast: 'Este usuário não existe.',
        });
      }
    }

    if (email) {
      const userWithEmail = await this.usersRepository.findOne({
        email,
      });
      if (!userWithEmail) {
        throw new NotFoundException({
          message: 'user not exists',
          toast: 'Este usuário não existe.',
        });
      }
    }

    return this.usersRepository.remove(where);
  }
}
