import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TokenService } from 'src/shared/services/token.service';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { FileService } from 'src/shared/services/file.service';
import { ProjectRepository } from 'src/shared/repository/project.repository';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [ProjectController],
  exports: [ProjectService],
  providers: [
    ProjectService,
    TokenService,
    FileService,
    {
      provide: ProjectRepository,
      useFactory: (connection: Connection) => connection.getCustomRepository(ProjectRepository),
      inject: [Connection],
    },
  ],
})
export class ProjectModule {}
