import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database';
import { CommandModule } from 'nestjs-command';
import { ExampleModule } from './example/example.module';
import { APP_PIPE } from '@nestjs/core';
import { AppValidationPipe } from './common/validation';
import { ScaffoldModule } from './common/scaffold';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScaffoldModule,
    CommandModule,
    ExampleModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new AppValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
