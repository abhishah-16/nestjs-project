import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProjectList {
  @ApiProperty({ required: false })
  @IsOptional()
  public limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  public field: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public sort: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public search: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public page: number;
}
