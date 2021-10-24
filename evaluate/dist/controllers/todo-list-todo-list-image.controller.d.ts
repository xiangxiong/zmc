import { Count, Filter, Where } from '@loopback/repository';
import { TodoList, TodoListImage } from '../models';
import { TodoListRepository } from '../repositories';
export declare class TodoListTodoListImageController {
    protected todoListRepository: TodoListRepository;
    constructor(todoListRepository: TodoListRepository);
    get(id: number, filter?: Filter<TodoListImage>): Promise<TodoListImage>;
    create(id: typeof TodoList.prototype.id, todoListImage: Omit<TodoListImage, 'id'>): Promise<TodoListImage>;
    patch(id: number, todoListImage: Partial<TodoListImage>, where?: Where<TodoListImage>): Promise<Count>;
    delete(id: number, where?: Where<TodoListImage>): Promise<Count>;
}
