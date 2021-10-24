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
        await todoListRepo.deleteAll();
    });
    it('creates a todoList', async () => {
        const todoList = (0, helpers_1.givenTodoList)();
        const response = await client
            .post('/todo-lists')
            .send(todoList)
            .expect(200);
        (0, testlab_1.expect)(response.body).to.containDeep(todoList);
        const result = await todoListRepo.findById(response.body.id);
        (0, testlab_1.expect)(result).to.containDeep(todoList);
    });
    context('when dealing with multiple persisted todoLists', () => {
        let persistedTodoLists;
        beforeEach(async () => {
            persistedTodoLists = await givenMutlipleTodoListInstances();
        });
        it('counts todoLists', async () => {
            const response = await client.get('/todo-lists/count').send().expect(200);
            (0, testlab_1.expect)(response.body.count).to.eql(persistedTodoLists.length);
        });
        it('counts a subset of todoLists', async () => {
            const response = await client
                .get('/todo-lists/count')
                .query({ where: { title: 'so many things to do wow' } })
                .expect(200);
            (0, testlab_1.expect)(response.body.count).to.equal(1);
        });
        it('finds all todoLists', async () => {
            const response = await client.get('/todo-lists').send().expect(200);
            (0, testlab_1.expect)(response.body).to.containDeep(persistedTodoLists);
        });
        it('updates all todoLists', async () => {
            const patchedColorTodo = { color: 'purple' };
            const response = await client
                .patch('/todo-lists')
                .send(patchedColorTodo)
                .expect(200);
            (0, testlab_1.expect)(response.body.count).to.eql(persistedTodoLists.length);
            const updatedTodoLists = await todoListRepo.find();
            for (const todoList of updatedTodoLists) {
                (0, testlab_1.expect)(todoList.color).to.eql(patchedColorTodo.color);
            }
        });
        it('updates selected todoLists', async () => {
            await todoListRepo.deleteAll();
            await (0, helpers_1.givenTodoListInstance)(todoListRepo, {
                title: 'red-list',
                color: 'red',
            });
            await (0, helpers_1.givenTodoListInstance)(todoListRepo, {
                title: 'green-list',
                color: 'green',
            });
            const response = await client
                .patch('/todo-lists')
                .query({ where: { color: 'red' } })
                .send({ color: 'purple' })
                .expect(200);
            (0, testlab_1.expect)(response.body.count).to.eql(1);
            // the matched TodoList was updated
            (0, testlab_1.expect)(await todoListRepo.findByTitle('red-list')).to.have.property('color', 'purple');
            // the other TodoList was not modified
            (0, testlab_1.expect)(await todoListRepo.findByTitle('green-list')).to.have.property('color', 'green');
        });
    });
    context('when dealing with a single persisted todoList', () => {
        let persistedTodoList;
        beforeEach(async () => {
            persistedTodoList = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        });
        it('gets a todoList by ID', async () => {
            const result = await client
                .get(`/todo-lists/${persistedTodoList.id}`)
                .send()
                .expect(200);
            const expected = (0, testlab_1.toJSON)(persistedTodoList);
            (0, testlab_1.expect)(result.body).to.deepEqual(expected);
        });
        it('returns 404 when getting a todo-list that does not exist', () => {
            return client.get('/todo-lists/99999').expect(404);
        });
        it('updates a todoList by ID (using patch)', async () => {
            const updatedTodoList = (0, helpers_1.givenTodoList)({
                title: 'A different title to the todo list',
            });
            await client
                .patch(`/todo-lists/${persistedTodoList.id}`)
                .send(updatedTodoList)
                .expect(204);
            const result = await todoListRepo.findById(persistedTodoList.id);
            (0, testlab_1.expect)(result).to.containEql(updatedTodoList);
        });
        it('updates a todoList by ID (using put)', async () => {
            const updatedTodoList = (0, helpers_1.givenTodoList)({
                title: 'A different title to the todo list',
            });
            await client
                .put(`/todo-lists/${persistedTodoList.id}`)
                .send(updatedTodoList)
                .expect(204);
            const result = await todoListRepo.findById(persistedTodoList.id);
            (0, testlab_1.expect)(result).to.containEql(updatedTodoList);
        });
        it('returns 404 when updating a todo-list that does not exist', () => {
            return client
                .patch('/todo-lists/99999')
                .send((0, helpers_1.givenTodoList)())
                .expect(404);
        });
        it('deletes a todoList by ID', async () => {
            await client
                .del(`/todo-lists/${persistedTodoList.id}`)
                .send()
                .expect(204);
            await (0, testlab_1.expect)(todoListRepo.findById(persistedTodoList.id)).to.be.rejectedWith(repository_1.EntityNotFoundError);
        });
    });
    it('queries todo-lists with a filter', async () => {
        await (0, helpers_1.givenTodoListInstance)(todoListRepo, { title: 'day', color: 'white' });
        const listInBlack = await (0, helpers_1.givenTodoListInstance)(todoListRepo, {
            title: 'night',
            color: 'black',
        });
        await client
            .get('/todo-lists')
            .query({ filter: { where: { color: 'black' } } })
            .expect(200, [(0, testlab_1.toJSON)(listInBlack)]);
    });
    it('includes Todos in query result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const filter = JSON.stringify({ include: ['todos'] });
        const response = await client.get('/todo-lists').query({ filter: filter });
        (0, testlab_1.expect)(response.body).to.have.length(1);
        (0, testlab_1.expect)(response.body[0]).to.deepEqual({
            ...(0, testlab_1.toJSON)(list),
            todos: [(0, testlab_1.toJSON)(todo)],
        });
    });
    it('exploded filter conditions work', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        await (0, helpers_1.givenTodoInstance)(todoRepo, { title: 'todo1', todoListId: list.id });
        await (0, helpers_1.givenTodoInstance)(todoRepo, { title: 'todo2', todoListId: list.id });
        await (0, helpers_1.givenTodoInstance)(todoRepo, { title: 'todo3', todoListId: list.id });
        const response = await client.get('/todos').query('filter[limit]=2');
        (0, testlab_1.expect)(response.body).to.have.length(2);
    });
    /*
     ============================================================================
     TEST HELPERS
     These functions help simplify setup of your test fixtures so that your tests
     can:
     - operate on a "clean" environment each time (a fresh in-memory database)
     - avoid polluting the test with large quantities of setup logic to keep
     them clear and easy to read
     - keep them DRY (who wants to write the same stuff over and over?)
     ============================================================================
     */
    function givenMutlipleTodoListInstances() {
        return Promise.all([
            (0, helpers_1.givenTodoListInstance)(todoListRepo),
            (0, helpers_1.givenTodoListInstance)(todoListRepo, { title: 'so many things to do wow' }),
        ]);
    }
});
//# sourceMappingURL=todo-list.acceptance.js.map