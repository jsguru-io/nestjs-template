import { BadRequestException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@jsgurucompany/jsg-nestjs-common';
import { CommandModule } from 'nestjs-command';
import { ExampleModule } from './example/example.module';
import { APP_PIPE } from '@nestjs/core';
import { ScaffoldModule } from '@jsgurucompany/jsg-nestjs-common';
import { AppValidationPipe } from '@jsgurucompany/jsg-nestjs-common';
import { AppValidationError } from '@jsgurucompany/jsg-nestjs-common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            models: [`${__dirname}/**/*.model.{ts,js}`],
          },
          migrator: {
            path: `${__dirname}/migration`,
            glob: `**/migration/*.migration.ts`,
          },
        };
      },
      inject: [ConfigService],
    }),
    ScaffoldModule,
    CommandModule,
    ExampleModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new AppValidationPipe({
          transform: true,
          exceptionFactory: (errors: AppValidationError[]) => {
            throw new BadRequestException(errors);
          },
        }),
    },
  ],
})
export class AppModule {}
