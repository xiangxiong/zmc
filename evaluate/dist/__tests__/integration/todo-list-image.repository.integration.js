"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const repositories_1 = require("../../repositories");
const helpers_1 = require("../helpers");
describe('TodoListImageRepository', () => {
    let todoListImageRepo;
    let todoListRepo;
    let todoRepo;
    before(async () => {
        todoListRepo = new repositories_1.TodoListRepository(helpers_1.testdb, async () => todoRepo, async () => todoListImageRepo);
        todoListImageRepo = new repositories_1.TodoListImageRepository(helpers_1.testdb, async () => todoListRepo);
    });
    beforeEach(helpers_1.givenEmptyDatabase);
    it('includes TodoList in find method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListImageRepo.find({
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual([
            {
                ...(0, testlab_1.toJSON)(image),
                todoList: (0, testlab_1.toJSON)(list),
            },
        ]);
    });
    it('includes TodoList in findById result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo, {});
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListImageRepo.findById(image.id, {
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(image),
            todoList: (0, testlab_1.toJSON)(list),
        });
    });
    it('includes TodoList in findOne result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo, {});
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListImageRepo.findOne({
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(image),
            todoList: (0, testlab_1.toJSON)(list),
        });
    });
});
//# sourceMappingURL=todo-list-image.repository.integration.js.map