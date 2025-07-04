import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CelebrityModule } from './celebrity/celebrity.module';
import { FanModule } from './fan/fan.module';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    CelebrityModule,
    FanModule,
    AuthModule,
    PdfModule,
    AiModule,
  ],
})
export class AppModule {}
