import { Entity } from '@loopback/repository';
import { TodoListImage, TodoListImageWithRelations } from './todo-list-image.model';
import { Todo, TodoWithRelations } from './todo.model';
export declare class TodoList extends Entity {
    id?: number;
    title: string;
    color?: string;
    todos: Todo[];
    image: TodoListImage;
    constructor(data?: Partial<TodoList>);
}
export interface TodoListRelations {
    todos?: TodoWithRelations[];
    image?: TodoListImageWithRelations;
}
export declare type TodoListWithRelations = TodoList & TodoListRelations;
