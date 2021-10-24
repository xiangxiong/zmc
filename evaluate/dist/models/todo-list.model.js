"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const tslib_1 = require("tslib");
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const todo_list_image_model_1 = require("./todo-list-image.model");
const todo_model_1 = require("./todo.model");
let TodoList = class TodoList extends repository_1.Entity {
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
], TodoList.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoList.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoList.prototype, "color", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.hasMany)(() => todo_model_1.Todo),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoList.prototype, "todos", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.hasOne)(() => todo_list_image_model_1.TodoListImage),
    (0, tslib_1.__metadata)("design:type", todo_list_image_model_1.TodoListImage)
], TodoList.prototype, "image", void 0);
TodoList = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoList);
exports.TodoList = TodoList;
//# sourceMappingURL=todo-list.model.js.map