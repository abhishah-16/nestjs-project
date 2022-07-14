import { Category } from '../../database/entities';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { from } from 'rxjs';
import { CategoryUpdateDto } from 'src/modules/category/dto/category-update.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async updateCategoryById(id: number, data: CategoryUpdateDto): Promise<Category> {
    const findCategory = await this.findOne({ id });
    if (!findCategory) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.save({
      id: id,
      ...data,
    });
  }

  public async getAllCategories() {
    return from(this.find());
  }

  public async getSingleCategory(id: number): Promise<Category> {
    return await this.findOne({ id });
  }
}
