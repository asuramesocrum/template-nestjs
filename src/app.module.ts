import { CacheModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import {AppController} from "./app.controller";

// import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    // SERVER IMPORTS
    // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    CacheModule.register({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    // CUSTOM MODULE IMPORT
    // ...
  ],
  controllers: [
      AppController,
  ],
  providers: [
    PrismaService,
  ],
})
export class AppModule {
}
