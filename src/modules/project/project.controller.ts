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
import { Project, Role } from 'src/database/entities';
import { Roles } from 'src/decorators';
import { ClientAuthGuard, RolesGuard } from 'src/guards';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectService } from './project.service';

@ApiBearerAuth()
@Controller('project')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  public constructor(private readonly projectService: ProjectService) {}

  @HttpCode(200)
  @Post('/')
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async addPost(@Body() data: ProjectCreateDto): Promise<Project> {
    return this.projectService.createProject(data);
  }

  @Patch('/:id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async update(@Param('id') id: number, @Body() data: ProjectUpdateDto): Promise<Project> {
    return this.projectService.update(id, data);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findAll() {
    return this.projectService.findAllProjects();
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findSingleProject(id);
  }
}
