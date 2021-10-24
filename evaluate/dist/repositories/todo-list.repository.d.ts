import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Todo, TodoList, TodoListImage, TodoListRelations } from '../models';
import { TodoListImageRepository } from './todo-list-image.repository';
import { TodoRepository } from './todo.repository';
export declare class TodoListRepository extends DefaultCrudRepository<TodoList, typeof TodoList.prototype.id, TodoListRelations> {
    protected todoRepositoryGetter: Getter<TodoRepository>;
    protected todoListImageRepositoryGetter: Getter<TodoListImageRepository>;
    readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;
    readonly image: HasOneRepositoryFactory<TodoListImage, typeof TodoList.prototype.id>;
    constructor(dataSource: DbDataSource, todoRepositoryGetter: Getter<TodoRepository>, todoListImageRepositoryGetter: Getter<TodoListImageRepository>);
    findByTitle(title: string): Promise<(TodoList & TodoListRelations) | null>;
}
