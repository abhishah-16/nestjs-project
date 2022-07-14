import { DeleteResult } from 'typeorm';
import { User } from 'src/database/entities';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Get,
  UseInterceptors,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthToken } from 'src/shared/interfaces';
import { UserCreateDto, UserLoginDto, UserUpdateDto, ListUsersDto, TokenDto } from './dto';
import { UserService } from './user.service';
import { UserResendEmailDto } from './dto/user-resendemail.dto';

@ApiBearerAuth()
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('login')
  public async login(@Body() data: UserLoginDto): Promise<AuthToken> {
    return this.userService.login(data);
  }

  @HttpCode(200)
  @Post('signup')
  public async signup(@Body() data: UserCreateDto): Promise<string> {
    return this.userService.signup(data);
  }

  @HttpCode(200)
  @Post('refresh-token')
  public async getAccessToken(@Body() data: TokenDto): Promise<AuthToken> {
    return this.userService.getToken(data.refreshToken);
  }

  @HttpCode(200)
  @Patch('update/:id')
  public async update(@Param('id') id: number, @Body() data: UserUpdateDto): Promise<User> {
    return this.userService.update(id, data);
  }

  @HttpCode(200)
  @Get('verify/:token')
  public async verify(@Param('token') token: string): Promise<User> {
    return this.userService.verify(token);
  }

  @HttpCode(200)
  @Post('resend-email')
  public async resend(@Body() data: UserResendEmailDto): Promise<string> {
    return this.userService.resendEmail(data);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

  @HttpCode(200)
  @Get('list')
  public async list(@Query() query: ListUsersDto): Promise<User[]> {
    return this.userService.list(query);
  }
}
