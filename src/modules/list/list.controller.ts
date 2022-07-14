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
import { List, Role } from 'src/database/entities';
import { Roles } from 'src/decorators';
import { ClientAuthGuard, RolesGuard } from 'src/guards';
import { ListService } from './list.service';
import { ListCreateDto } from './dto/list-create.dto';
import { ListUpdateDto } from './dto/list-update.dto';

@ApiBearerAuth()
@Controller('list')
@UseInterceptors(ClassSerializerInterceptor)
export class ListController {
  public constructor(private readonly listService: ListService) {}

  @HttpCode(200)
  @Post('/')
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async addList(@Body() data: ListCreateDto): Promise<List> {
    return this.listService.createList(data);
  }

  @Patch('/:id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(ClientAuthGuard, RolesGuard)
  public async update(@Param('id') id: number, @Body() data: ListUpdateDto): Promise<List> {
    return this.listService.update(id, data);
  }

  @Get('/getAll')
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findAll() {
    return this.listService.findAllCategories();
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(ClientAuthGuard)
  public async findOne(@Param('id') id: number): Promise<List> {
    return this.listService.findSingleList(id);
  }
}
