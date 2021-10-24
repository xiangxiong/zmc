import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { TodoList, TodoListImage, TodoListImageRelations } from '../models';
import { TodoListRepository } from './todo-list.repository';
export declare class TodoListImageRepository extends DefaultCrudRepository<TodoListImage, typeof TodoListImage.prototype.id, TodoListImageRelations> {
    protected todoListRepositoryGetter: Getter<TodoListRepository>;
    readonly todoList: BelongsToAccessor<TodoList, typeof TodoListImage.prototype.id>;
    constructor(dataSource: DbDataSource, todoListRepositoryGetter: Getter<TodoListRepository>);
}
