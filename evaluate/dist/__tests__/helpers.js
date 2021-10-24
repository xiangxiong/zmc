"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.testdb = exports.givenEmptyDatabase = exports.givenTodoListImageInstance = exports.givenTodoListInstance = exports.givenTodoInstance = exports.givenTodoListRepositories = exports.givenTodoRepositories = exports.givenRunningApplicationWithCustomConfiguration = exports.givenTodoListImage = exports.givenTodoList = exports.givenTodoWithoutId = exports.givenTodo = void 0;
const repository_1 = require("@loopback/repository");
const testlab_1 = require("@loopback/testlab");
const application_1 = require("../application");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
/*
 ==============================================================================
 HELPER FUNCTIONS
 If you find yourself creating the same helper functions across different
 test files, then extracting those functions into helper modules is an easy
 way to reduce duplication.

 Other tips:

 - Using the super awesome Partial<T> type in conjunction with Object.assign
   means you can:
   * customize the object you get back based only on what's important
   to you during a particular test
   * avoid writing test logic that is brittle with respect to the properties
   of your object
 - Making the input itself optional means you don't need to do anything special
   for tests where the particular details of the input don't matter.
 ==============================================================================
 */
/**
 * Generate a complete Todo object for use with tests.
 * @param todo - A partial (or complete) Todo object.
 */
function givenTodo(todo) {
    const data = Object.assign({
        title: 'do a thing',
        desc: 'There are some things that need doing',
        isComplete: false,
        todoListId: 999,
    }, todo);
    return new models_1.Todo(data);
}
exports.givenTodo = givenTodo;
function givenTodoWithoutId(todo) {
    return givenTodo(todo);
}
exports.givenTodoWithoutId = givenTodoWithoutId;
/**
 * Generate a complete TodoList object for use with tests
 * @param todoList - A partial (or complete) TodoList object.
 */
function givenTodoList(todoList) {
    const data = Object.assign({
        title: 'List of things',
    }, todoList);
    return new models_1.TodoList(data);
}
exports.givenTodoList = givenTodoList;
/**
 * Generate a complete TodoListImage object for use with tests.
 * @param todoListImage - A partial (or complete) TodoListImage object.
 */
function givenTodoListImage(todoListImage) {
    const data = Object.assign({
        value: 'A picture of a basket of fruits',
    }, todoListImage);
    return new models_1.TodoListImage(data);
}
exports.givenTodoListImage = givenTodoListImage;
async function givenRunningApplicationWithCustomConfiguration() {
    const app = new application_1.TodoListApplication({
        rest: (0, testlab_1.givenHttpServerConfig)(),
    });
    await app.boot();
    /**
     * Override default config for DataSource for testing so we don't write
     * test data to file when using the memory connector.
     */
    app.bind('datasources.config.db').to({
        name: 'db',
        connector: 'memory',
    });
    // Start Application
    await app.start();
    return app;
}
exports.givenRunningApplicationWithCustomConfiguration = givenRunningApplicationWithCustomConfiguration;
async function givenTodoRepositories(app) {
    const todoRepo = await app.getRepository(repositories_1.TodoRepository);
    const todoListRepo = await app.getRepository(repositories_1.TodoListRepository);
    return { todoRepo, todoListRepo };
}
exports.givenTodoRepositories = givenTodoRepositories;
async function givenTodoListRepositories(app) {
    const todoListRepo = await app.getRepository(repositories_1.TodoListRepository);
    const todoListImageRepo = await app.getRepository(repositories_1.TodoListImageRepository);
    return { todoListRepo, todoListImageRepo };
}
exports.givenTodoListRepositories = givenTodoListRepositories;
async function givenTodoInstance(todoRepo, todo) {
    return todoRepo.create(givenTodo(todo));
}
exports.givenTodoInstance = givenTodoInstance;
async function givenTodoListInstance(todoListRepo, data) {
    return todoListRepo.create(givenTodoList(data));
}
exports.givenTodoListInstance = givenTodoListInstance;
async function givenTodoListImageInstance(todoListImageRepo, data) {
    return todoListImageRepo.create(givenTodoListImage(data));
}
exports.givenTodoListImageInstance = givenTodoListImageInstance;
async function givenEmptyDatabase() {
    const todoRepo = new repositories_1.TodoRepository(exports.testdb, async () => todoListRepo);
    const todoListRepo = new repositories_1.TodoListRepository(exports.testdb, async () => todoRepo, async () => todoListImageRepo);
    const todoListImageRepo = new repositories_1.TodoListImageRepository(exports.testdb, async () => todoListRepo);
    await todoRepo.deleteAll();
    await todoListRepo.deleteAll();
    await todoListImageRepo.deleteAll();
}
exports.givenEmptyDatabase = givenEmptyDatabase;
exports.testdb = new repository_1.juggler.DataSource({
    name: 'db',
    connector: 'memory',
});
//# sourceMappingURL=helpers.js.map