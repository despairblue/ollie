import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { addTodo, markTodoAsDone, updateTodo, getTodos } from './helpers';

describe('todos', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('allows adding and retrieving a todo', async () => {
    const supertest = request(app.getHttpServer());
    const todo = {
      title: 'test title',
      description: 'test description',
    };
    await addTodo(supertest, todo);
    const response = await getTodos(supertest);

    expect(response.body).toMatchObject({
      data: {
        todos: [
          {
            description: 'test description',
            id: '1',
            status: 'TODO',
            title: 'test title',
          },
        ],
      },
    });
  });

  it('allows to update a todo', async () => {
    const supertest = request(app.getHttpServer());

    const todo1 = {
      title: 'test title',
      description: 'test description',
    };
    const todo2 = {
      title: 'test title 2',
      description: 'test description 2',
    };

    await addTodo(supertest, todo1);
    await addTodo(supertest, todo2);
    await updateTodo(supertest, {
      id: '1',
      title: 'new title',
      description: 'new description',
    });
    const response = await getTodos(supertest);

    expect(response.body).toMatchObject({
      data: {
        todos: [
          {
            id: '1',
            description: 'new description',
            title: 'new title',
            status: 'TODO',
          },
          {
            ...todo2,
            id: '2',
            status: 'TODO',
          },
        ],
      },
    });
  });

  it('allows to mark a todo as done', async () => {
    const supertest = request(app.getHttpServer());

    const todo1 = {
      title: 'test title',
      description: 'test description',
    };
    const todo2 = {
      title: 'test title 2',
      description: 'test description 2',
    };

    await addTodo(supertest, todo1);
    await addTodo(supertest, todo2);
    await markTodoAsDone(supertest, '1');
    const response = await getTodos(supertest);

    expect(response.body).toMatchObject({
      data: {
        todos: [
          {
            id: '1',
            ...todo1,
            status: 'DONE',
          },
          {
            ...todo2,
            id: '2',
            status: 'TODO',
          },
        ],
      },
    });
  });
});
