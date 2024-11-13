import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')?.[1];
    if (!token) {
      throw new UnauthorizedException('User is unauthorized');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.verifiedUser = {
        mobile: decoded.mobile,
        role: decoded.role,
      };
      return true;
    } catch (e) {
      console.debug(e);
      throw new UnauthorizedException('User is unauthorized');
    }
  }
}
