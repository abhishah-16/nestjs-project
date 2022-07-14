import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CategoryUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  public name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public isActive: boolean;
}
