"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let TodoRepository = class TodoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, todoListRepositoryGetter) {
        super(models_1.Todo, dataSource);
        this.todoListRepositoryGetter = todoListRepositoryGetter;
        this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter);
        this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
    }
};
TodoRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.db')),
    (0, tslib_1.__param)(1, repository_1.repository.getter('TodoListRepository')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.DbDataSource, Function])
], TodoRepository);
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=todo.repository.js.map