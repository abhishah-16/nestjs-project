import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ListRepository } from 'src/shared/repository/list.repository';
import { ListCreateDto } from './dto/list-create.dto';
import { ListUpdateDto } from './dto/list-update.dto';
import { List } from 'src/database/entities';
import { ProjectRepository } from 'src/shared/repository/project.repository';
import { CategoryRepository } from 'src/shared/repository';

@Injectable()
export class ListService {
  private limit: number;
  private skip: number;
  constructor(
    private readonly listRepo: ListRepository,
    private readonly projectRepo: ProjectRepository,
    private readonly categoryRepo: CategoryRepository
  ) {
  }

  public async createList(data: ListCreateDto): Promise<List> {
    const { name } = data;
    const newList = new List();
    const project = await this.projectRepo.getSingleProject(1);
    const category = await this.categoryRepo.getSingleCategory(1);
    newList.name = name;
    newList.project = project
    newList.category = category
    return await this.listRepo.save(newList);
  }

  public async update(id: number, data: ListUpdateDto): Promise<List> {
    try {
      return await this.listRepo.updateListById(id, data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllCategories() {
    const list = this.listRepo.getAllCategories();
    if (!list) {
      throw new NotFoundException('No categories found!');
    }
    return list;
  }

  public async findSingleList(id: number) {
    const list = await this.listRepo.getSingleList(id);
    if (!list) {
      throw new NotFoundException('No list found! Please try again.');
    }
    return list;
  }
}
