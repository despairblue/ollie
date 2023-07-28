import { SuperTest, Test, Response } from 'supertest';

export async function addTodo(
  supertest: SuperTest<Test>,
  input: {
    title: string;
    description: string;
  },
): Promise<Response> {
  return supertest
    .post('/graphql')
    .send({
      query: `
        mutation createTodo($input: CreateTodoInput!) {
          createTodo(createTodoInput: $input) {
            id
            description
            title
          }
        }
    `,
      operationName: 'createTodo',
      variables: { input },
    })
    .expect(200);
}

export async function getTodos(supertest: SuperTest<Test>): Promise<Response> {
  return supertest
    .post('/graphql')
    .send({
      query: `
        {
          todos{
            id
            description
            title
            status
          }
        }
    `,
    })
    .expect(200);
}

export async function updateTodo(
  supertest: SuperTest<Test>,
  input: { id: string; title: string; description: string },
): Promise<Response> {
  return supertest
    .post('/graphql')
    .send({
      query: `
        mutation updateTodo($input: UpdateTodoInput!) {
          updateTodo(updateTodoInput: $input) {
            id
            title
            description
            status
          }
        }
      `,
      operationName: 'updateTodo',
      variables: { input },
    })
    .expect(200);
}

export async function markTodoAsDone(
  supertest: SuperTest<Test>,
  id: string,
): Promise<Response> {
  return supertest
    .post('/graphql')
    .send({
      query: `
        mutation markTodoAsDone($id: ID!) {
          markTodoAsDone(id: $id) {
            id
            title
            description
            status
          }
        }
      `,
      operationName: 'markTodoAsDone',
      variables: { id },
    })
    .expect(200);
}
