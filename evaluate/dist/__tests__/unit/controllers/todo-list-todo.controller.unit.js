"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const testlab_1 = require("@loopback/testlab");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const helpers_1 = require("../../helpers");
describe('TodoController', () => {
    let todoListRepo;
    let constrainedTodoRepo;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /*
    =============================================================================
    REPOSITORY FACTORY STUB
    This handle give us a quick way to fake the response of our repository
    without needing to wrangle fake repository objects or manage real ones
    in our tests themselves.
    =============================================================================
     */
    let todos;
    /*
    =============================================================================
    METHOD STUBS
    These handles give us a quick way to fake the response of our repository
    without needing to wrangle fake repository objects or manage real ones
    in our tests themselves.
    =============================================================================
     */
    let create;
    let find;
    let patch;
    let del;
    /* eslint-enable @typescript-eslint/no-explicit-any */
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
    let aTodoListWithId;
    let aTodo;
    let aTodoWithId;
    let aListOfTodos;
    let aTodoToPatchTo;
    let aChangedTodo;
    beforeEach(resetRepositories);
    describe('create()', () => {
        it('creates a todo on a todoList', async () => {
            create.resolves(aTodoWithId);
            (0, testlab_1.expect)(await controller.create(aTodoListWithId.id, aTodo)).to.eql(aTodoWithId);
            testlab_1.sinon.assert.calledWith(todos, aTodoListWithId.id);
            testlab_1.sinon.assert.calledWith(create, aTodo);
        });
    });
    describe('find()', () => {
        it('returns multiple todos if they exist', async () => {
            find.resolves(aListOfTodos);
            (0, testlab_1.expect)(await controller.find(aTodoListWithId.id)).to.eql(aListOfTodos);
            testlab_1.sinon.assert.calledWith(todos, aTodoListWithId.id);
            testlab_1.sinon.assert.called(find);
        });
        it('returns empty list if no todos exist', async () => {
            const expected = [];
            find.resolves(expected);
            (0, testlab_1.expect)(await controller.find(aTodoListWithId.id)).to.eql(expected);
            testlab_1.sinon.assert.calledWith(todos, aTodoListWithId.id);
            testlab_1.sinon.assert.called(find);
        });
    });
    describe('patch()', () => {
        it('returns a number of todos updated', async () => {
            patch.resolves({ count: [aChangedTodo].length });
            const where = { title: aTodoWithId.title };
            (0, testlab_1.expect)(await controller.patch(aTodoListWithId.id, aTodoToPatchTo, where)).to.eql({ count: 1 });
            testlab_1.sinon.assert.calledWith(todos, aTodoListWithId.id);
            testlab_1.sinon.assert.calledWith(patch, aTodoToPatchTo, where);
        });
    });
    describe('deleteAll()', () => {
        it('returns a number of todos deleted', async () => {
            del.resolves({ count: aListOfTodos.length });
            (0, testlab_1.expect)(await controller.delete(aTodoListWithId.id)).to.eql({
                count: aListOfTodos.length,
            });
            testlab_1.sinon.assert.calledWith(todos, aTodoListWithId.id);
            testlab_1.sinon.assert.called(del);
        });
    });
    function resetRepositories() {
        todoListRepo = (0, testlab_1.createStubInstance)(repositories_1.TodoListRepository);
        constrainedTodoRepo = (0, testlab_1.createStubInstance)(repository_1.DefaultHasManyRepository);
        aTodoListWithId = (0, helpers_1.givenTodoList)({
            id: 1,
        });
        aTodo = (0, helpers_1.givenTodo)();
        aTodoWithId = (0, helpers_1.givenTodo)({ id: 1 });
        aListOfTodos = [
            aTodoWithId,
            (0, helpers_1.givenTodo)({
                id: 2,
                title: 'do another thing',
            }),
        ];
        aTodoToPatchTo = (0, helpers_1.givenTodo)({
            title: 'revised thing to do',
        });
        aChangedTodo = (0, helpers_1.givenTodo)({
            id: aTodoWithId.id,
            title: aTodoToPatchTo.title,
        });
        todos = testlab_1.sinon
            .stub()
            .withArgs(aTodoListWithId.id)
            .returns(constrainedTodoRepo);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        todoListRepo.todos = todos;
        // Setup CRUD fakes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ create, find, patch, delete: del } = constrainedTodoRepo.stubs);
        controller = new controllers_1.TodoListTodoController(todoListRepo);
    }
});
//# sourceMappingURL=todo-list-todo.controller.unit.js.map