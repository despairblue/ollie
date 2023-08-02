import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import {
  Configuration,
  ConfigurationType,
} from '../configuration/configuration';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          // The default is `joi`, but I feel joi is a bit dated nowadays and zod
          // provides a much better user experience and integration with typescript
          // So here I'll deviate from the defaults of NestJS
          // TODO: extract into own file
          validate: Configuration.validate,
          envFilePath: '.test.env',
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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    const model: Model<User> = module.get(getModelToken(User.name));
    await model.deleteMany({});
  });

  describe('create', () => {
    it('allows creating a user', async () => {
      await service.create({ username: 'test', password: '1234' });

      const user = await service.findOneByUsername('test');

      if (user == null) {
        return expect(user).toBeDefined();
      }

      expect(user.username).toEqual('test');
      expect(user.password).toEqual('1234');
    });
  });

  describe('update', () => {
    it('allows updating a user', async () => {
      const user = await service.create({ username: 'test', password: '1234' });

      expect(user.syncToken).toBeUndefined();
      expect(user.todoistApiKey).toBeUndefined();

      await service.update(user._id, {
        todoistApiKey: 'todoistApiKey',
        syncToken: 'syncToken',
      });

      const updatedUser = await service.findOneByUsername('test');

      if (updatedUser == null) {
        return expect(updatedUser).toBeDefined();
      }

      expect(updatedUser.syncToken).toEqual('syncToken');
      expect(updatedUser.todoistApiKey).toEqual('todoistApiKey');
    });
  });

  describe('findAllWithTodoistAPIKey', () => {
    it('returns only users that have a todoist API key set', async () => {
      const user1 = await service.create({
        username: 'test1',
        password: '1234',
      });
      const user2 = await service.create({
        username: 'test2',
        password: '1234',
      });

      expect(user1.todoistApiKey).toBeUndefined();
      expect(user2.todoistApiKey).toBeUndefined();

      await service.update(user1._id, { todoistApiKey: 'todoistApiKey' });

      const usersWithTodoistAPIKey = await service.findAllWithTodoistAPIKey();

      expect(usersWithTodoistAPIKey).toHaveLength(1);
      expect(usersWithTodoistAPIKey).toMatchObject([
        {
          username: 'test1',
          password: '1234',
          todoistApiKey: 'todoistApiKey',
        },
      ]);
    });
  });

  describe('findOneById', () => {
    it('returns the user with that ID', async () => {
      const user1 = await service.create({
        username: 'test1',
        password: '1234',
      });
      await service.create({
        username: 'test2',
        password: '1234',
      });

      const user = await service.findOneById(user1._id);

      if (user == null) {
        return expect(user).toBeDefined();
      }

      expect(String(user._id)).toEqual(String(user1._id));
    });
  });

  describe('findOneByUsername', () => {
    it('returns the user with that username', async () => {
      const user1 = await service.create({
        username: 'test1',
        password: '1234',
      });
      await service.create({
        username: 'test2',
        password: '1234',
      });

      const user = await service.findOneByUsername(user1.username);

      if (user == null) {
        return expect(user).toBeDefined();
      }

      expect(user.username).toEqual(user1.username);
      expect(String(user._id)).toEqual(String(user1._id));
    });
  });
});
