import { join } from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { ListsModule } from './lists/lists.module';
import { TodoistModule } from './todoist/todoist.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Configuration,
  ConfigurationType,
} from './configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // I'd leave this on even in production. It makes debugging and testing
      // in production much easier and if security is a concern, well, hiding
      // the schema is not a good way to handle security.
      playground: true,
      introspection: true,

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    TodosModule,
    ListsModule,
    TodoistModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      // The default is `joi`, but I feel joi is a bit dated nowadays and zod
      // provides a much better user experience and integration with typescript
      // So here I'll deviate from the defaults of NestJS
      // TODO: extract into own file
      validate: Configuration.validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<ConfigurationType, true>,
      ) => ({
        uri: configService.get('MONGODB_URI', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
