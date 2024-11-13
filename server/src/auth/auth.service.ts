import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(mobile: string, password: string) {
    const user = await this.userService.findUserByMobile(mobile);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    if (user && user.password === password) {
      return {
        mobile: user.mobile,
        role: user.role,
      };
    }
    return null;
  }
  async makeToken(user: { mobile: string; role: string }) {
    const token = {
      mobile: user.mobile,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(token);
    return { accessToken, mobile: token.mobile, role: token.role };
  }

  async onLogin(mobile: string, password: string) {
    const user = await this.validateUser(mobile, password);
    if (!user) {
      throw new UnauthorizedException('Wrong mobile or password');
    } else {
      return await this.makeToken(user);
    }
  }

  async onSignUp(mobile: string, password) {
    const user = await this.userService.findUserByMobile(mobile);
    if (user) {
      throw new UnauthorizedException('User Exist');
    }
    const createUser = await this.userService.createUser(mobile, password);
    return await this.makeToken(createUser);
  }
}
