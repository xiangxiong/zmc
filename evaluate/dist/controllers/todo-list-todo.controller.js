"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListTodoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TodoListTodoController = class TodoListTodoController {
    constructor(todoListRepository) {
        this.todoListRepository = todoListRepository;
    }
    async create(id, todo) {
        return this.todoListRepository.todos(id).create(todo);
    }
    async find(id, filter) {
        return this.todoListRepository.todos(id).find(filter);
    }
    async patch(id, todo, where) {
        return this.todoListRepository.todos(id).patch(todo, where);
    }
    async delete(id, where) {
        return this.todoListRepository.todos(id).delete(where);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Todo) } },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, {
                    title: 'NewTodoInTodoList',
                    exclude: ['id'],
                    optional: ['todoListId'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListTodoController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'Array of TodoList has many Todo',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Todo) },
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.query.object('filter')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListTodoController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Todo))),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListTodoController.prototype, "patch", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Todo))),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListTodoController.prototype, "delete", null);
TodoListTodoController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.TodoListRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.TodoListRepository])
], TodoListTodoController);
exports.TodoListTodoController = TodoListTodoController;
//# sourceMappingURL=todo-list-todo.controller.js.map