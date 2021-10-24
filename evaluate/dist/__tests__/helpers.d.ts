import { juggler } from '@loopback/repository';
import { TodoListApplication } from '../application';
import { Todo, TodoList, TodoListImage } from '../models';
import { TodoListImageRepository, TodoListRepository, TodoRepository } from '../repositories';
/**
 * Generate a complete Todo object for use with tests.
 * @param todo - A partial (or complete) Todo object.
 */
export declare function givenTodo(todo?: Partial<Todo>): Todo;
export declare function givenTodoWithoutId(todo?: Partial<Todo>): Omit<Todo, 'id'>;
/**
 * Generate a complete TodoList object for use with tests
 * @param todoList - A partial (or complete) TodoList object.
 */
export declare function givenTodoList(todoList?: Partial<TodoList>): TodoList;
/**
 * Generate a complete TodoListImage object for use with tests.
 * @param todoListImage - A partial (or complete) TodoListImage object.
 */
export declare function givenTodoListImage(todoListImage?: Partial<TodoListImage>): Omit<TodoListImage, 'id'>;
export declare function givenRunningApplicationWithCustomConfiguration(): Promise<TodoListApplication>;
export declare function givenTodoRepositories(app: TodoListApplication): Promise<{
    todoRepo: TodoRepository;
    todoListRepo: TodoListRepository;
}>;
export declare function givenTodoListRepositories(app: TodoListApplication): Promise<{
    todoListRepo: TodoListRepository;
    todoListImageRepo: TodoListImageRepository;
}>;
export declare function givenTodoInstance(todoRepo: TodoRepository, todo?: Partial<Todo>): Promise<Todo>;
export declare function givenTodoListInstance(todoListRepo: TodoListRepository, data?: Partial<TodoList>): Promise<TodoList>;
export declare function givenTodoListImageInstance(todoListImageRepo: TodoListImageRepository, data?: Partial<TodoListImage>): Promise<TodoListImage>;
export declare function givenEmptyDatabase(): Promise<void>;
export declare const testdb: juggler.DataSource;
