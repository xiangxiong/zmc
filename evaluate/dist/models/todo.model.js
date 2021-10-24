"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const todo_list_model_1 = require("./todo-list.model");
let Todo = class Todo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: false,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Todo.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Todo.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Todo.prototype, "desc", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Todo.prototype, "isComplete", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.belongsTo)(() => todo_list_model_1.TodoList),
    (0, tslib_1.__metadata)("design:type", Number)
], Todo.prototype, "todoListId", void 0);
Todo = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.model.js.map