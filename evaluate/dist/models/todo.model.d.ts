import { Entity } from '@loopback/repository';
import { TodoListWithRelations } from './todo-list.model';
export declare class Todo extends Entity {
    id?: number;
    title: string;
    desc?: string;
    isComplete?: boolean;
    todoListId: number;
    constructor(data?: Partial<Todo>);
}
export interface TodoRelations {
    todoList?: TodoListWithRelations;
}
export declare type TodoWithRelations = Todo & TodoRelations;
