import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CategoryCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'No name provided' })
  public name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;
}
