"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const helpers_1 = require("../helpers");
describe('TodoListApplication', () => {
    let app;
    let client;
    let todoListRepo;
    let todoListImageRepo;
    let persistedTodoList;
    before(async () => {
        app = await (0, helpers_1.givenRunningApplicationWithCustomConfiguration)();
    });
    after(() => app.stop());
    before(async () => {
        ({ todoListRepo, todoListImageRepo } = await (0, helpers_1.givenTodoListRepositories)(app));
    });
    before(() => {
        client = (0, testlab_1.createRestAppClient)(app);
    });
    beforeEach(async () => {
        await todoListImageRepo.deleteAll();
        await todoListRepo.deleteAll();
    });
    beforeEach(async () => {
        persistedTodoList = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
    });
    it('creates image for a todoList', async () => {
        const todoListImage = (0, helpers_1.givenTodoListImage)();
        delete todoListImage.todoListId;
        const response = await client
            .post(`/todo-lists/${persistedTodoList.id}/todo-list-image`)
            .send(todoListImage)
            .expect(200);
        const expected = {
            ...todoListImage,
            todoListId: persistedTodoList.id,
        };
        (0, testlab_1.expect)(response.body).to.containEql(expected);
        const created = await todoListImageRepo.findById(response.body.id);
        (0, testlab_1.expect)((0, testlab_1.toJSON)(created)).to.deepEqual({ id: response.body.id, ...expected });
    });
    it('finds images for a todoList', async () => {
        const todoListImage = await givenTodoListImageInstanceOfTodoList(persistedTodoList.id, {
            value: 'A picture of a green checkmark',
        });
        const response = await client
            .get(`/todo-lists/${persistedTodoList.id}/todo-list-image`)
            .send()
            .expect(200);
        (0, testlab_1.expect)(response.body).to.containDeep(todoListImage);
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
    async function givenTodoListImageInstanceOfTodoList(id, todoListImage) {
        const data = (0, helpers_1.givenTodoListImage)(todoListImage);
        delete data.todoListId;
        return todoListRepo.image(id).create(data);
    }
});
//# sourceMappingURL=todo-list-image.acceptance.js.map