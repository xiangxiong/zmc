import { Client } from '@loopback/testlab';
import { TodoListApplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: TodoListApplication;
    client: Client;
}
