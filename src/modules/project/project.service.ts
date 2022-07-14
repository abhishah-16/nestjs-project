import { ConfigService } from 'src/config/config.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TokenService } from 'src/shared/services/token.service';
import { ProjectRepository } from 'src/shared/repository/project.repository';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { Project } from 'src/database/entities';

@Injectable()
export class ProjectService {
  private limit: number;
  private skip: number;
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.limit = this.configService.get('limit');
    this.skip = this.configService.get('skip');
  }

  public async createProject(data: ProjectCreateDto): Promise<Project> {
    const { name, description } = data;
    const newProject = new Project();
    newProject.name = name;
    newProject.description = description;
    return await this.projectRepo.save(newProject);
  }

  public async update(id: number, data: ProjectUpdateDto): Promise<Project> {
    try {
      return await this.projectRepo.updateUserById(id, data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllProjects() {
    const project = this.projectRepo.getAllProjects();
    if (!project) {
      throw new NotFoundException('No projects found!');
    }
    return project;
  }

  public async findSingleProject(id: number) {
    const product = await this.projectRepo.getSingleProject(id);
    if (!product) {
      throw new NotFoundException('No product found! Please try again.');
    }
    return product;
  }
}
