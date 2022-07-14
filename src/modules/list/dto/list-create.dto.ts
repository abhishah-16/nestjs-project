import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class ListCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'No name provided' })
  public name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public priority: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public adminComment: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public clientComment: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public fileAttachments: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;
}
