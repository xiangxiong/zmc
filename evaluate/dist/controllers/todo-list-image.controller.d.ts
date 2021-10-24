import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { TodoList, TodoListImage } from '../models';
import { TodoListImageRepository } from '../repositories';
export declare class TodoListImageController {
    todoListImageRepository: TodoListImageRepository;
    constructor(todoListImageRepository: TodoListImageRepository);
    create(todoListImage: Omit<TodoListImage, 'id'>): Promise<TodoListImage>;
    count(where?: Where<TodoListImage>): Promise<Count>;
    find(filter?: Filter<TodoListImage>): Promise<TodoListImage[]>;
    updateAll(todoListImage: TodoListImage, where?: Where<TodoListImage>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<TodoListImage>): Promise<TodoListImage>;
    updateById(id: number, todoListImage: TodoListImage): Promise<void>;
    replaceById(id: number, todoListImage: TodoListImage): Promise<void>;
    deleteById(id: number): Promise<void>;
    getTodoList(id: typeof TodoListImage.prototype.id): Promise<TodoList>;
}
