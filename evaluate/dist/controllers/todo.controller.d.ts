import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Todo, TodoList } from '../models';
import { TodoRepository } from '../repositories';
export declare class TodoController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    create(todo: Omit<Todo, 'id'>): Promise<Todo>;
    findById(id: number, filter?: FilterExcludingWhere<Todo>): Promise<Todo>;
    find(filter?: Filter<Todo>): Promise<Todo[]>;
    replaceById(id: number, todo: Todo): Promise<void>;
    updateById(id: number, todo: Todo): Promise<void>;
    deleteById(id: number): Promise<void>;
    getTodoList(id: typeof Todo.prototype.id): Promise<TodoList>;
    count(where?: Where<Todo>): Promise<Count>;
    updateAll(todo: Todo, where?: Where<Todo>): Promise<Count>;
}
