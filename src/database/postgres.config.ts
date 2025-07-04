import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
