"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TodoListController = class TodoListController {
    constructor(todoListRepository) {
        this.todoListRepository = todoListRepository;
    }
    async create(todoList) {
        return this.todoListRepository.create(todoList);
    }
    async count(where) {
        return this.todoListRepository.count(where);
    }
    async find(filter) {
        return this.todoListRepository.find(filter);
    }
    async updateAll(todoList, where) {
        return this.todoListRepository.updateAll(todoList, where);
    }
    async findById(id, filter) {
        return this.todoListRepository.findById(id, filter);
    }
    async updateById(id, todoList) {
        await this.todoListRepository.updateById(id, todoList);
    }
    async deleteById(id) {
        await this.todoListRepository.deleteById(id);
    }
    async replaceById(id, todoList) {
        await this.todoListRepository.replaceById(id, todoList);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/todo-lists', {
        responses: {
            '200': {
                description: 'TodoList model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList) } },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, {
                    title: 'NewTodoList',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/todo-lists/count', {
        responses: {
            '200': {
                description: 'TodoList model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.TodoList)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/todo-lists', {
        responses: {
            '200': {
                description: 'Array of TodoList model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.TodoList, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.TodoList)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/todo-lists', {
        responses: {
            '200': {
                description: 'TodoList PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.TodoList)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.TodoList, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/todo-lists/{id}', {
        responses: {
            '200': {
                description: 'TodoList model instance',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.TodoList, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/todo-lists/{id}', {
        responses: {
            '204': {
                description: 'TodoList PATCH success',
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.TodoList]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/todo-lists/{id}', {
        responses: {
            '204': {
                description: 'TodoList DELETE success',
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/todo-lists/{id}', {
        responses: {
            '204': {
                description: 'TodoList PUT success',
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.TodoList]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoListController.prototype, "replaceById", null);
TodoListController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.TodoListRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.TodoListRepository])
], TodoListController);
exports.TodoListController = TodoListController;
//# sourceMappingURL=todo-list.controller.js.map