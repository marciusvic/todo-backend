import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'olhar180' as string,
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.usersService.findOne(
      { id: Number(payload.sub) },
      {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
