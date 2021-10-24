"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const testlab_1 = require("@loopback/testlab");
const helpers_1 = require("../helpers");
describe('TodoListApplication', () => {
    let app;
    let client;
    let todoRepo;
    let todoListRepo;
    before(async () => {
        app = await (0, helpers_1.givenRunningApplicationWithCustomConfiguration)();
    });
    after(() => app.stop());
    before(async () => {
        ({ todoRepo, todoListRepo } = await (0, helpers_1.givenTodoRepositories)(app));
    });
    before(() => {
        client = (0, testlab_1.createRestAppClient)(app);
    });
    beforeEach(async () => {
        await todoRepo.deleteAll();
    });
    it('creates a todo', async function () {
        const todo = (0, helpers_1.givenTodo)();
        const response = await client.post('/todos').send(todo).expect(200);
        (0, testlab_1.expect)(response.body).to.containDeep(todo);
        const result = await todoRepo.findById(response.body.id);
        (0, testlab_1.expect)(result).to.containDeep(todo);
    });
    it('gets a count of todos', async function () {
        await (0, helpers_1.givenTodoInstance)(todoRepo, {
            title: 'say hello',
            desc: 'formal greeting',
        });
        await (0, helpers_1.givenTodoInstance)(todoRepo, {
            title: 'say goodbye',
            desc: 'formal farewell',
        });
        await client.get('/todos/count').expect(200, { count: 2 });
    });
    it('rejects requests to create a todo with no title', async () => {
        const todo = (0, helpers_1.givenTodo)();
        delete todo.title;
        await client.post('/todos').send(todo).expect(422);
    });
    context('when dealing with a single persisted todo', () => {
        let persistedTodo;
        beforeEach(async () => {
            persistedTodo = await (0, helpers_1.givenTodoInstance)(todoRepo);
        });
        it('gets a todo by ID', () => {
            return client
                .get(`/todos/${persistedTodo.id}`)
                .send()
                .expect(200, (0, testlab_1.toJSON)(persistedTodo));
        });
        it('returns 404 when getting a todo that does not exist', () => {
            return client.get('/todos/99999').expect(404);
        });
        it('replaces the todo by ID', async () => {
            const updatedTodo = (0, helpers_1.givenTodo)({
                title: 'DO SOMETHING AWESOME',
                desc: 'It has to be something ridiculous',
                isComplete: true,
            });
            await client
                .put(`/todos/${persistedTodo.id}`)
                .send(updatedTodo)
                .expect(204);
            const result = await todoRepo.findById(persistedTodo.id);
            (0, testlab_1.expect)(result).to.containEql(updatedTodo);
        });
        it('returns 404 when replacing a todo that does not exist', () => {
            return client.put('/todos/99999').send((0, helpers_1.givenTodo)()).expect(404);
        });
        it('updates the todo by ID ', async () => {
            const updatedTodo = (0, helpers_1.givenTodo)({
                title: 'DO SOMETHING AWESOME',
                isComplete: true,
            });
            await client
                .patch(`/todos/${persistedTodo.id}`)
                .send(updatedTodo)
                .expect(204);
            const result = await todoRepo.findById(persistedTodo.id);
            (0, testlab_1.expect)(result).to.containEql(updatedTodo);
        });
        it('returns 404 when updating a todo that does not exist', () => {
            return client.patch('/todos/99999').send((0, helpers_1.givenTodo)()).expect(404);
        });
        it('deletes the todo', async () => {
            await client.del(`/todos/${persistedTodo.id}`).send().expect(204);
            await (0, testlab_1.expect)(todoRepo.findById(persistedTodo.id)).to.be.rejectedWith(repository_1.EntityNotFoundError);
        });
        it('returns 404 when deleting a todo that does not exist', async () => {
            await client.del(`/todos/99999`).expect(404);
        });
        it('returns the owning todo-list', async () => {
            const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
            const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
            await client.get(`/todos/${todo.id}/todo-list`).expect(200, (0, testlab_1.toJSON)(list));
        });
    });
    it('queries todos with a filter', async () => {
        await (0, helpers_1.givenTodoInstance)(todoRepo, { title: 'wake up', isComplete: true });
        const todoInProgress = await (0, helpers_1.givenTodoInstance)(todoRepo, {
            title: 'go to sleep',
            isComplete: false,
        });
        await client
            .get('/todos')
            .query({ filter: { where: { isComplete: false } } })
            .expect(200, [(0, testlab_1.toJSON)(todoInProgress)]);
    });
    it('updates todos using a filter', async () => {
        await (0, helpers_1.givenTodoInstance)(todoRepo, {
            title: 'hello',
            desc: 'common greeting',
            isComplete: false,
        });
        await (0, helpers_1.givenTodoInstance)(todoRepo, {
            title: 'goodbye',
            desc: 'common farewell',
            isComplete: false,
        });
        await client
            .patch('/todos')
            .query({ where: { title: 'goodbye' } })
            .send({ isComplete: true })
            .expect(200, { count: 1 });
    });
    it('includes TodoList in query result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const filter = JSON.stringify({ include: ['todoList'] });
        const response = await client.get('/todos').query({ filter: filter });
        (0, testlab_1.expect)(response.body).to.have.length(1);
        (0, testlab_1.expect)(response.body[0]).to.deepEqual({
            ...(0, testlab_1.toJSON)(todo),
            todoList: (0, testlab_1.toJSON)(list),
        });
    });
});
//# sourceMappingURL=todo.acceptance.js.map