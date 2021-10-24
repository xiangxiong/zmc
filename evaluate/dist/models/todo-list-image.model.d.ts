import { Entity } from '@loopback/repository';
import { TodoListWithRelations } from './todo-list.model';
export declare class TodoListImage extends Entity {
    id?: number;
    value: string;
    todoListId: number;
    constructor(data?: Partial<TodoListImage>);
}
export interface TodoListImageRelations {
    todoList?: TodoListWithRelations;
}
export declare type TodoListImageWithRelations = TodoListImage & TodoListImageRelations;
