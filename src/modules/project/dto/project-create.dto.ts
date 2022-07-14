import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'No name provided' })
  public name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;
}
