"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const repositories_1 = require("../../repositories");
const helpers_1 = require("../helpers");
describe('TodoListRepository', () => {
    let todoListImageRepo;
    let todoListRepo;
    let todoRepo;
    before(async () => {
        todoListRepo = new repositories_1.TodoListRepository(helpers_1.testdb, async () => todoRepo, async () => todoListImageRepo);
        todoRepo = new repositories_1.TodoRepository(helpers_1.testdb, async () => todoListRepo);
        todoListImageRepo = new repositories_1.TodoListImageRepository(helpers_1.testdb, async () => todoListRepo);
    });
    beforeEach(helpers_1.givenEmptyDatabase);
    it('includes Todos in find method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoListRepo.find({
            include: ['todos'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual([
            {
                ...(0, testlab_1.toJSON)(list),
                todos: [(0, testlab_1.toJSON)(todo)],
            },
        ]);
    });
    it('includes Todos in findById result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoListRepo.findById(list.id, {
            include: ['todos'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(list),
            todos: [(0, testlab_1.toJSON)(todo)],
        });
    });
    it('includes Todos in findOne method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const response = await todoListRepo.findOne({
            where: { id: list.id },
            include: ['todos'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(list),
            todos: [(0, testlab_1.toJSON)(todo)],
        });
    });
    it('includes TodoListImage in find method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListRepo.find({
            include: ['image'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual([
            {
                ...(0, testlab_1.toJSON)(list),
                image: (0, testlab_1.toJSON)(image),
            },
        ]);
    });
    it('includes TodoListImage in findById method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListRepo.findById(list.id, {
            include: ['image'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(list),
            image: (0, testlab_1.toJSON)(image),
        });
    });
    it('includes TodoListImage in findOne method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListRepo.findOne({
            include: ['image'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual({
            ...(0, testlab_1.toJSON)(list),
            image: (0, testlab_1.toJSON)(image),
        });
    });
    it('includes both Todos and TodoListImage in find method result', async () => {
        const list = await (0, helpers_1.givenTodoListInstance)(todoListRepo);
        const todo = await (0, helpers_1.givenTodoInstance)(todoRepo, { todoListId: list.id });
        const image = await (0, helpers_1.givenTodoListImageInstance)(todoListImageRepo, {
            todoListId: list.id,
        });
        const response = await todoListRepo.find({
            include: ['image', 'todos'],
        });
        (0, testlab_1.expect)((0, testlab_1.toJSON)(response)).to.deepEqual([
            {
                ...(0, testlab_1.toJSON)(list),
                image: (0, testlab_1.toJSON)(image),
                todos: [(0, testlab_1.toJSON)(todo)],
            },
        ]);
    });
});
//# sourceMappingURL=todo-list.repository.integration.js.map