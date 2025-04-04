import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { RolesAvailable } from 'lib/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(
      { email },
      {
        password: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        id: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolesPermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    );

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  login(user: Users) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: { email: string; password: string; name?: string }) {
    const userWithEmail = await this.usersService.findOne({
      email: data.email,
    });
    if (userWithEmail) {
      throw new BadRequestException({
        toast: 'Erro ao criar usuário. Tente com outro email',
        message: 'bad request',
      });
    }
    const createdUser = await this.usersService.create({ ...data });
    const { password: _, ...result } = createdUser;
    return result;
  }

  async privateRegisterSupport(data: {
    email: string;
    password: string;
    name?: string;
  }) {
    const userWithEmail = await this.usersService.findOne({
      email: data.email,
    });
    if (userWithEmail) {
      throw new BadRequestException({
        toast: 'Erro ao criar usuário. Tente com outro email',
        message: 'bad request',
      });
    }
    const createdUser = await this.usersService.create({
      ...data,
      userRoles: {
        create: {
          role: {
            connect: {
              name: RolesAvailable['support-manager'],
            },
          },
        },
      },
    });
    const { password: _, ...result } = createdUser;
    return result;
  }
}
