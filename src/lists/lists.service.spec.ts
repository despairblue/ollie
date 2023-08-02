import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { ListsService } from './lists.service';
import { List, ListSchema } from './entities/list.entity';
import mongoose, { Model } from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Configuration,
  ConfigurationType,
} from '../configuration/configuration';

describe('ListsService', () => {
  let service: ListsService;

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
        MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
      ],
      providers: [ListsService],
    }).compile();

    service = module.get<ListsService>(ListsService);
    const model: Model<List> = module.get(getModelToken(List.name));

    await model.deleteMany({});
  });

  describe('findOneById', () => {
    it('allows to find a specific one by id', async () => {
      const userId1 = new mongoose.Types.ObjectId().toString();
      const userId2 = new mongoose.Types.ObjectId().toString();
      const list1 = await service.create({
        name: 'test1',
        userId: userId1,
      });
      await service.create({
        name: 'test2',
        userId: userId2,
      });

      const list = await service.findOneById(list1._id);

      if (list == null) {
        return expect(list).toBeDefined();
      }

      expect(String(list._id)).toEqual(String(list1._id));
      expect(String(list.userId)).toEqual(userId1);
      expect(list.name).toEqual(list1.name);
    });
  });

  describe('findAllByUser', () => {
    it('allows to create lists and finds them', async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      await service.create({
        name: 'test',
        userId,
      });

      const lists = await service.findAllByUser(userId);

      expect(lists).toHaveLength(1);
      expect(lists[0].name).toEqual('test');
      expect(String(lists[0].userId)).toEqual(userId);
    });

    it('findAllByUser only returns lists owned by that user', async () => {
      const userId1 = new mongoose.Types.ObjectId().toString();
      const userId2 = new mongoose.Types.ObjectId().toString();
      await service.create({
        name: 'test1',
        userId: userId1,
      });
      await service.create({
        name: 'test2',
        userId: userId2,
      });

      const lists = await service.findAllByUser(userId1);

      expect(lists).toHaveLength(1);
      expect(lists[0].name).toEqual('test1');
      expect(String(lists[0].userId)).toEqual(userId1);
    });
  });
});
