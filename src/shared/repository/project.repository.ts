import { Project } from '../../database/entities';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { from } from 'rxjs';
import { ProjectUpdateDto } from 'src/modules/project/dto/project-update.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async updateUserById(id: number, data: ProjectUpdateDto): Promise<Project> {
    const findProject = await this.findOne({ id });
    if (!findProject) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.save({
      id: id,
      ...data,
    });
  }

  public async getAllProjects() {
    return from(this.find());
  }

  public async getSingleProject(id: number): Promise<Project> {
    return await this.findOne({ id });
  }
}
