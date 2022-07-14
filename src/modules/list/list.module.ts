import { ListController } from './list.controller';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TokenService } from 'src/shared/services/token.service';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { FileService } from 'src/shared/services/file.service';
import { ListRepository } from 'src/shared/repository/list.repository';
import { ListService } from './list.service';
import { CategoryRepository, ProjectRepository } from 'src/shared/repository';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [ListController],
  exports: [ListService],
  providers: [
    ListService,
    TokenService,
    FileService,
    ProjectRepository,
    CategoryRepository,
    {
      provide: ListRepository,
      useFactory: (connection: Connection) => connection.getCustomRepository(ListRepository),
      inject: [Connection],
    },
  ],
})
export class ListModule {}
