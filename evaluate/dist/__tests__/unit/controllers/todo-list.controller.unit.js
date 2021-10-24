"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const helpers_1 = require("../../helpers");
describe('TodoController', () => {
    let todoListRepo;
    /*
    =============================================================================
    TEST VARIABLES
    Combining top-level objects with our resetRepositories method means we don't
    need to duplicate several variable assignments (and generation statements)
    in all of our test logic.
  
    NOTE: If you wanted to parallelize your test runs, you should avoid this
    pattern since each of these tests is sharing references.
    =============================================================================
    */
    let controller;
    let aTodoList;
    let aTodoListWithId;
    let aTodoListToPatchTo;
    let aChangedTodoList;
    let aListOfTodoLists;
    beforeEach(resetRepositories);
    describe('create()', () => {
        it('creates a TodoList', async () => {
            const create = todoListRepo.stubs.create;
            create.resolves(aTodoListWithId);
            (0, testlab_1.expect)(await controller.create(aTodoList)).to.eql(aTodoListWithId);
            testlab_1.sinon.assert.calledWith(create, aTodoList);
        });
    });
    describe('count()', () => {
        it('returns the number of existing todoLists', async () => {
            const count = todoListRepo.stubs.count;
            count.resolves({ count: aListOfTodoLists.length });
            (0, testlab_1.expect)(await controller.count()).to.eql({ count: aListOfTodoLists.length });
            testlab_1.sinon.assert.called(count);
        });
    });
    describe('find()', () => {
        it('returns multiple todos if they exist', async () => {
            const find = todoListRepo.stubs.find;
            find.resolves(aListOfTodoLists);
            (0, testlab_1.expect)(await controller.find()).to.eql(aListOfTodoLists);
            testlab_1.sinon.assert.called(find);
        });
        it('returns empty list if no todos exist', async () => {
            const find = todoListRepo.stubs.find;
            const expected = [];
            find.resolves(expected);
            (0, testlab_1.expect)(await controller.find()).to.eql(expected);
            testlab_1.sinon.assert.called(find);
        });
    });
    describe('updateAll()', () => {
        it('returns a number of todos updated', async () => {
            const updateAll = todoListRepo.stubs.updateAll;
            updateAll.resolves({ count: [aChangedTodoList].length });
            const where = { title: aTodoListWithId.title };
            const result = await controller.updateAll(aTodoListToPatchTo, where);
            (0, testlab_1.expect)(result).to.eql({ count: 1 });
            testlab_1.sinon.assert.calledWith(updateAll, aTodoListToPatchTo, where);
        });
    });
    describe('findById()', () => {
        it('returns a todo if it exists', async () => {
            const findById = todoListRepo.stubs.findById;
            findById.resolves(aTodoListWithId);
            (0, testlab_1.expect)(await controller.findById(aTodoListWithId.id)).to.eql(aTodoListWithId);
            testlab_1.sinon.assert.calledWith(findById, aTodoListWithId.id);
        });
    });
    describe('updateById', () => {
        it('successfully updates existing items', async () => {
            const updateById = todoListRepo.stubs.updateById;
            updateById.resolves();
            await controller.updateById(aTodoListWithId.id, aTodoListToPatchTo);
            testlab_1.sinon.assert.calledWith(updateById, aTodoListWithId.id, aTodoListToPatchTo);
        });
    });
    describe('deleteById', () => {
        it('successfully deletes existing items', async () => {
            const deleteById = todoListRepo.stubs.deleteById;
            deleteById.resolves();
            await controller.deleteById(aTodoListWithId.id);
            testlab_1.sinon.assert.calledWith(deleteById, aTodoListWithId.id);
        });
    });
    function resetRepositories() {
        todoListRepo = (0, testlab_1.createStubInstance)(repositories_1.TodoListRepository);
        aTodoList = (0, helpers_1.givenTodoList)();
        aTodoListWithId = (0, helpers_1.givenTodoList)({
            id: 1,
        });
        aListOfTodoLists = [
            aTodoListWithId,
            (0, helpers_1.givenTodoList)({
                id: 2,
                title: 'a lot of todos',
            }),
        ];
        aTodoListToPatchTo = (0, helpers_1.givenTodoList)({
            title: 'changed list of todos',
        });
        aChangedTodoList = (0, helpers_1.givenTodoList)({
            id: aTodoListWithId.id,
            title: aTodoListToPatchTo.title,
        });
        controller = new controllers_1.TodoListController(todoListRepo);
    }
});
//# sourceMappingURL=todo-list.controller.unit.js.map