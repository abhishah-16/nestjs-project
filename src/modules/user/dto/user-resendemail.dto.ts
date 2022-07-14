import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserResendEmailDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'email is not provided' })
  public email: string;
}
