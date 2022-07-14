import { ILike, FindOperator, DeleteResult } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthToken } from 'src/shared/interfaces';
import { TokenService } from 'src/shared/services/token.service';
import { UserRepository } from '../../shared/repository';
import { createHash, match } from '../../utils/helper';
import { UserCreateDto, UserUpdateDto, UserLoginDto, ListUsersDto, UserResendEmailDto } from './dto';
import { User, Role } from 'src/database/entities';
import { EmailService } from 'src/shared/services';

@Injectable()
export class UserService {
  private limit: number;
  private skip: number;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.limit = this.configService.get('limit');
    this.skip = this.configService.get('skip');
  }

  public async login(data: UserLoginDto): Promise<AuthToken> {
    try {
      const { email, password } = data;
      const checkUser = await this.userRepo.findUserAccountByEmail(email);
      if (!checkUser) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
      }
      if (!checkUser.isVerified) {
        throw new HttpException('VERIFY_USER', HttpStatus.CONFLICT);
      }
      if (!match(checkUser.password, password)) {
        throw new HttpException('INVALID_PASSWORD', HttpStatus.CONFLICT);
      }
      return await this.tokenService.generateNewTokens(checkUser);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async signup(data: UserCreateDto): Promise<string> {
    try {
      const { email, password, firstName, lastName } = data;
      const checkUser = await this.userRepo.findUserAccountByEmail(email);
      if (checkUser) {
        throw new HttpException('USER_EXISTS', HttpStatus.CONFLICT);
      }
      const newUser = {} as UserCreateDto;
      const hashPassword = createHash(password);
      newUser.email = data.email;
      newUser.password = hashPassword;
      newUser.firstName = firstName.trim();
      newUser.lastName = lastName.trim();
      newUser.role = Role.USER;
      const user = await this.userRepo.createUser(newUser);
      const generatedTokens = await this.tokenService.generateNewTokens(user);
      const generateVerificationLink = `http://localhost:3000/api/user/verify/${generatedTokens.accessToken}`;
      await this.emailService.sendEmail(
        'verify-email',
        [newUser.email],
        { verificationLink: generateVerificationLink },
        'Please verify your Email',
      );
      return 'Please verify your email Id. We have just sent an email';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getToken(refreshToken: string): Promise<AuthToken> {
    try {
      const match = await this.tokenService.verify(refreshToken);
      if (!match) {
        throw new BadRequestException();
      }
      const user = await this.userRepo.findOne({ id: match.id });
      if (!user) {
        throw new BadRequestException();
      }
      return await this.tokenService.generateNewTokens(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.PARTIAL_CONTENT);
    }
  }

  public async update(id: number, data: UserUpdateDto): Promise<User> {
    try {
      return await this.userRepo.updateUserById(id, data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async verify(token: string): Promise<User> {
    try {
      const match = await this.tokenService.verify(token);
      if (!match) {
        throw new HttpException('INVALID_TOKEN', HttpStatus.BAD_REQUEST);
      }
      const checkUser = await this.userRepo.findUserAccountByEmail(match.email);
      if (!checkUser) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
      }
      if (checkUser.isVerified) {
        throw new HttpException('ALREADY_VERIFIED', HttpStatus.CONFLICT);
      }
      checkUser.isVerified = true;
      return await this.userRepo.save(checkUser);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async resendEmail(data: UserResendEmailDto): Promise<string> {
    try {
      const checkUser = await this.userRepo.findUserAccountByEmail(data.email);
      if (!checkUser) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
      }
      const generatedTokens = await this.tokenService.generateNewTokens(checkUser);
      const generateVerificationLink = `http://localhost:3000/api/user/verify/${generatedTokens.accessToken}`;
      await this.emailService.sendEmail(
        'verify-email',
        [data.email],
        { verificationLink: generateVerificationLink },
        'Please verify your Email',
      );
      return 'Please verify your email Id. We have just sent an email';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepo.deleteUserById(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async list(query: ListUsersDto): Promise<User[]> {
    try {
      const { limit, sort, search, field, page } = query;
      type searchQuery = {
        order: {
          [field: string]: string;
        };
        take: number;
        skip: number;
        where: {
          role: Role;
          email?: FindOperator<string>;
        };
      };
      const searchQuery = {} as searchQuery;
      searchQuery.order = sort ? { [field]: `${sort.toUpperCase()}` } : null || { id: 'DESC' };
      searchQuery.take = limit || this.limit;
      searchQuery.skip = (page - 1) * searchQuery.take || this.skip;
      searchQuery.where = search ? { email: ILike(`%${search}%`), role: Role.USER } : null || { role: Role.USER };
      return await this.userRepo.getAllUsers(searchQuery);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
