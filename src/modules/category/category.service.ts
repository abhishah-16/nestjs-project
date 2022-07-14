import { ConfigService } from 'src/config/config.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TokenService } from 'src/shared/services/token.service';
import { CategoryRepository } from 'src/shared/repository/category.repository';
import { CategoryCreateDto } from './dto/category-create.dto';
import { CategoryUpdateDto } from './dto/category-update.dto';
import { Category } from 'src/database/entities';

@Injectable()
export class CategoryService {
  private limit: number;
  private skip: number;
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.limit = this.configService.get('limit');
    this.skip = this.configService.get('skip');
  }

  public async createCategory(data: CategoryCreateDto): Promise<Category> {
    const { name, description } = data;
    const newCategory = new Category();
    newCategory.name = name;
    newCategory.description = description;
    return await this.categoryRepo.save(newCategory);
  }

  public async update(id: number, data: CategoryUpdateDto): Promise<Category> {
    try {
      return await this.categoryRepo.updateCategoryById(id, data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllCategories() {
    const category = this.categoryRepo.getAllCategories();
    if (!category) {
      throw new NotFoundException('No categories found!');
    }
    return category;
  }

  public async findSingleCategory(id: number) {
    const category = await this.categoryRepo.getSingleCategory(id);
    if (!category) {
      throw new NotFoundException('No category found! Please try again.');
    }
    return category;
  }
}
