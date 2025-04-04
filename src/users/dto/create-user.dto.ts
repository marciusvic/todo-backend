import { Prisma } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UsersCreateInput {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  name?: string | null | undefined;
  @IsString()
  password: string;
}
