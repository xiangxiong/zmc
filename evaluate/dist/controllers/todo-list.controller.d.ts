import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { TodoList } from '../models';
import { TodoListRepository } from '../repositories';
export declare class TodoListController {
    todoListRepository: TodoListRepository;
    constructor(todoListRepository: TodoListRepository);
    create(todoList: Omit<TodoList, 'id'>): Promise<TodoList>;
    count(where?: Where<TodoList>): Promise<Count>;
    find(filter?: Filter<TodoList>): Promise<TodoList[]>;
    updateAll(todoList: TodoList, where?: Where<TodoList>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<TodoList>): Promise<TodoList>;
    updateById(id: number, todoList: TodoList): Promise<void>;
    deleteById(id: number): Promise<void>;
    replaceById(id: number, todoList: TodoList): Promise<void>;
}
