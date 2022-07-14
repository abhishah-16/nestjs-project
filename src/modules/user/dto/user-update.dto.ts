import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/database/entities';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  public email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public isVerified: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  public address1: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public address2: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public state: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public postalCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public isActive: boolean;

  @ApiProperty({ required: false })
  @IsEnum(Role)
  @IsOptional()
  public role: Role;
}
