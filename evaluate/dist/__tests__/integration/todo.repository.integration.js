"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const repositories_1 = require("../../repositories");
const helpers_1 = require("../helpers");
describe('TodoRepository', () => {
    let todoListImageRepo;
    let todoListRepo;
    let todoRepo;
    before(async () => {
        todoListRepo = new repositories_1.TodoListRepository(helpers_1.testdb, async () => todoRepo, async () => todoListImageRepo);
        todoRepo = new repositories_1.TodoRepository(helpers_1.testdb, async () => todoListRepo);
    });
    beforeEach(helpers_1.givenEmptyDatabase);
    it('includes TodoList in find method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoRepo.find({
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual([
            {
                ...(0, testlab_1.toJSON)(todo),
                todoList: (0, testlab_1.toJSON)(list),
            },
        ]);
    });
    it('includes TodoList in findById result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo, {});
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoRepo.findById(todo.id, {
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(todo),
            todoList: (0, testlab_1.toJSON)(list),
        });
    });
    it('includes TodoList in findOne method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoRepo.findOne({
            include: ['todoList'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(todo),
            todoList: (0, testlab_1.toJSON)(list),
        });
    });
});
//# sourceMappingURL=todo.repository.integration.js.map