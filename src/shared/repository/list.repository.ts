import { List } from '../../database/entities';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { from } from 'rxjs';
import { ListUpdateDto } from 'src/modules/list/dto/list-update.dto';

@EntityRepository(List)
export class ListRepository extends Repository<List> {
  public async updateListById(id: number, data: ListUpdateDto): Promise<List> {
    const findList = await this.findOne({ id });
    if (!findList) {
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

  public async getSingleList(id: number): Promise<List> {
    return await this.findOne({ id });
  }
}
