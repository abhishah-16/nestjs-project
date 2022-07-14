import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Category, Role } from 'src/database/entities';
import { Roles } from 'src/decorators';
import { ClientAuthGuard, RolesGuard } from 'src/guards';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category-create.dto';
import { CategoryUpdateDto } from './dto/category-update.dto';

@ApiBearerAuth()
@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(200)
  @Post('/')
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async addCategory(@Body() data: CategoryCreateDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Patch('/:id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async update(@Param('id') id: number, @Body() data: CategoryUpdateDto): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Get('/getAll')
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findAll() {
    return this.categoryService.findAllCategories();
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findSingleCategory(id);
  }
}
