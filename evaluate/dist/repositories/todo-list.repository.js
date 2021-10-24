"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let TodoListRepository = class TodoListRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, todoRepositoryGetter, todoListImageRepositoryGetter) {
        super(models_1.TodoList, dataSource);
        this.todoRepositoryGetter = todoRepositoryGetter;
        this.todoListImageRepositoryGetter = todoListImageRepositoryGetter;
        this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter);
        this.registerInclusionResolver('todos', this.todos.inclusionResolver);
        this.image = this.createHasOneRepositoryFactoryFor('image', todoListImageRepositoryGetter);
        this.registerInclusionResolver('image', this.image.inclusionResolver);
    }
    findByTitle(title) {
        return this.findOne({ where: { title } });
    }
};
TodoListRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.db')),
    (0, tslib_1.__param)(1, repository_1.repository.getter('TodoRepository')),
    (0, tslib_1.__param)(2, repository_1.repository.getter('TodoListImageRepository')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.DbDataSource, Function, Function])
], TodoListRepository);
exports.TodoListRepository = TodoListRepository;
//# sourceMappingURL=todo-list.repository.js.map