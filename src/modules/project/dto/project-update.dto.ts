import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ProjectUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  public name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public description: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;
}
