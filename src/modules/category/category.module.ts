import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TokenService } from 'src/shared/services/token.service';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { FileService } from 'src/shared/services/file.service';
import { CategoryRepository } from 'src/shared/repository/category.repository';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [
    CategoryService,
    TokenService,
    FileService,
    {
      provide: CategoryRepository,
      useFactory: (connection: Connection) => connection.getCustomRepository(CategoryRepository),
      inject: [Connection],
    },
  ],
})
export class CategoryModule {}
