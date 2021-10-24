import { Binding, BindingAddress, BindingFromClassOptions, Provider, Constructor } from '@loopback/core';
import { Application, MixinTarget, ServiceOptions, Component } from '@loopback/core';
import * as loopbackContext from '@loopback/core';
/**
 * Interface for classes with `new` operator.
 */
export interface Class<T> {
    new (...args: any[]): T;
}
/**
 * A mixin class for Application that creates a .serviceProvider()
 * function to register a service automatically. Also overrides
 * component function to allow it to register repositories automatically.
 *
 * @example
 * ```ts
 * class MyApplication extends ServiceMixin(Application) {}
 * ```
 *
 * Please note: the members in the mixin function are documented in a dummy class
 * called <a href="#ServiceMixinDoc">ServiceMixinDoc</a>
 *
 * @param superClass - Application class
 * @returns A new class that extends the super class with service proxy related
 * methods
 *
 * @typeParam T - Type of the application class as the target for the mixin
 */
export declare function ServiceMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        /**
         * Add a service to this application.
         *
         * @deprecated Use app.service() instead
         *
         * @param provider - The service provider to register.
         *
         * @example
         * ```ts
         * export interface GeocoderService {
         *   geocode(address: string): Promise<GeoPoint[]>;
         * }
         *
         * export class GeocoderServiceProvider implements Provider<GeocoderService> {
         *   constructor(
         *     @inject('services.geocoder')
         *     protected dataSource: juggler.DataSource = new GeocoderDataSource(),
         *   ) {}
         *
         *   value(): Promise<GeocoderService> {
         *     return getService(this.dataSource);
         *   }
         * }
         *
         * app.serviceProvider(GeocoderServiceProvider);
         * ```
         */
        serviceProvider<S>(provider: Constructor<Provider<S>>, nameOrOptions?: string | ServiceOptions | undefined): Binding<S>;
        /**
         * Add a component to this application. Also mounts
         * all the components services.
         *
         * @param component - The component to add.
         *
         * @example
         * ```ts
         *
         * export class ProductComponent {
         *   controllers = [ProductController];
         *   repositories = [ProductRepo, UserRepo];
         *   providers = {
         *     [AUTHENTICATION_STRATEGY]: AuthStrategy,
         *     [AUTHORIZATION_ROLE]: Role,
         *   };
         * };
         *
         * app.component(ProductComponent);
         * ```
         */
        component<C extends Component = Component>(componentCtor: Constructor<C>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<C>;
        /**
         * Get an instance of a component and mount all it's
         * services. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount services of
         */
        mountComponentServices<C_1 extends Component = Component>(component: Constructor<C_1>, componentBindingKey?: BindingAddress<C_1> | undefined): void;
        readonly options: loopbackContext.ApplicationConfig;
        readonly state: string;
        controller: <T_1>(controllerCtor: loopbackContext.ControllerClass<T_1>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_1>;
        server: <T_2 extends loopbackContext.Server>(ctor: Constructor<T_2>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_2>;
        servers: <T_3 extends loopbackContext.Server>(ctors: Constructor<T_3>[]) => Binding<any>[];
        getServer: <T_4 extends loopbackContext.Server>(target: string | Constructor<T_4>) => Promise<T_4>;
        init: () => Promise<void>;
        onInit: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        start: () => Promise<void>;
        onStart: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        stop: () => Promise<void>;
        onStop: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        setMetadata: (metadata: loopbackContext.ApplicationMetadata) => void;
        lifeCycleObserver: <T_5 extends loopbackContext.LifeCycleObserver>(ctor: Constructor<T_5>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_5>;
        service: <S_1>(cls: loopbackContext.ServiceOrProviderClass<S_1>, nameOrOptions?: string | ServiceOptions | undefined) => Binding<S_1>;
        interceptor: (interceptor: loopbackContext.Interceptor | Constructor<Provider<loopbackContext.Interceptor>>, nameOrOptions?: string | loopbackContext.InterceptorBindingOptions | undefined) => Binding<loopbackContext.Interceptor>;
        readonly name: string;
        readonly subscriptionManager: loopbackContext.ContextSubscriptionManager;
        scope: loopbackContext.BindingScope;
        readonly parent: loopbackContext.Context | undefined;
        emitEvent: <T_6 extends loopbackContext.ContextEvent>(type: string, event: T_6) => void;
        emitError: (err: unknown) => void;
        bind: <ValueType = any>(key: BindingAddress<ValueType>) => Binding<ValueType>;
        add: (binding: Binding<unknown>) => Application;
        configure: <ConfigValueType = any>(key?: BindingAddress<unknown> | undefined) => Binding<ConfigValueType>;
        getConfigAsValueOrPromise: <ConfigValueType_1>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => loopbackContext.ValueOrPromise<ConfigValueType_1 | undefined>;
        getConfig: <ConfigValueType_2>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => Promise<ConfigValueType_2 | undefined>;
        getConfigSync: <ConfigValueType_3>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => ConfigValueType_3 | undefined;
        unbind: (key: BindingAddress<unknown>) => boolean;
        subscribe: (observer: loopbackContext.ContextEventObserver) => loopbackContext.Subscription;
        unsubscribe: (observer: loopbackContext.ContextEventObserver) => boolean;
        close: () => void;
        isSubscribed: (observer: loopbackContext.ContextObserver) => boolean;
        createView: <T_7 = unknown>(filter: loopbackContext.BindingFilter, comparator?: loopbackContext.BindingComparator | undefined, options?: Omit<loopbackContext.ResolutionOptions, "session"> | undefined) => loopbackContext.ContextView<T_7>;
        contains: (key: BindingAddress<unknown>) => boolean;
        isBound: (key: BindingAddress<unknown>) => boolean;
        getOwnerContext: (keyOrBinding: BindingAddress<unknown> | Readonly<Binding<unknown>>) => loopbackContext.Context | undefined;
        getScopedContext: (scope: loopbackContext.BindingScope.APPLICATION | loopbackContext.BindingScope.SERVER | loopbackContext.BindingScope.REQUEST) => loopbackContext.Context | undefined;
        getResolutionContext: (binding: Readonly<Binding<unknown>>) => loopbackContext.Context | undefined;
        isVisibleTo: (ctx: loopbackContext.Context) => boolean;
        find: <ValueType_1 = any>(pattern?: string | RegExp | loopbackContext.BindingFilter | undefined) => Readonly<Binding<ValueType_1>>[];
        findByTag: <ValueType_2 = any>(tagFilter: RegExp | loopbackContext.BindingTag) => Readonly<Binding<ValueType_2>>[];
        get: {
            <ValueType_3>(keyWithPath: BindingAddress<ValueType_3>, session?: loopbackContext.ResolutionSession | undefined): Promise<ValueType_3>;
            <ValueType_4>(keyWithPath: BindingAddress<ValueType_4>, options: loopbackContext.ResolutionOptions): Promise<ValueType_4 | undefined>;
        };
        getSync: {
            <ValueType_5>(keyWithPath: BindingAddress<ValueType_5>, session?: loopbackContext.ResolutionSession | undefined): ValueType_5;
            <ValueType_6>(keyWithPath: BindingAddress<ValueType_6>, options?: loopbackContext.ResolutionOptions | undefined): ValueType_6 | undefined;
        };
        getBinding: {
            <ValueType_7 = any>(key: BindingAddress<ValueType_7>): Binding<ValueType_7>;
            <ValueType_8>(key: BindingAddress<ValueType_8>, options?: {
                optional?: boolean | undefined;
            } | undefined): Binding<ValueType_8> | undefined;
        };
        findOrCreateBinding: <T_8>(key: BindingAddress<T_8>, policy?: loopbackContext.BindingCreationPolicy | undefined) => Binding<T_8>;
        getValueOrPromise: <ValueType_9>(keyWithPath: BindingAddress<ValueType_9>, optionsOrSession?: loopbackContext.ResolutionOptionsOrSession | undefined) => loopbackContext.ValueOrPromise<ValueType_9 | undefined>;
        toJSON: () => loopbackContext.JSONObject;
        inspect: (options?: loopbackContext.ContextInspectOptions | undefined) => loopbackContext.JSONObject;
        on: {
            (eventName: "bind" | "unbind", listener: loopbackContext.ContextEventListener): Application;
            (event: string | symbol, listener: (...args: any[]) => void): Application;
        };
        once: {
            (eventName: "bind" | "unbind", listener: loopbackContext.ContextEventListener): Application;
            (event: string | symbol, listener: (...args: any[]) => void): Application;
        };
        addListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        off: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeAllListeners: (event?: string | symbol | undefined) => Application;
        setMaxListeners: (n: number) => Application;
        getMaxListeners: () => number;
        listeners: (event: string | symbol) => Function[];
        rawListeners: (event: string | symbol) => Function[];
        emit: (event: string | symbol, ...args: any[]) => boolean;
        listenerCount: (type: string | symbol) => number;
        prependListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        eventNames: () => (string | symbol)[];
    };
} & T;
/**
 * Interface for an Application mixed in with ServiceMixin
 */
export interface ApplicationWithServices extends Application {
    serviceProvider<S>(provider: Constructor<Provider<S>>, name?: string): Binding<S>;
    component(component: Constructor<{}>, name?: string): Binding;
    mountComponentServices(component: Constructor<{}>): void;
}
/**
 * A dummy class created to generate the tsdoc for the members in service
 * mixin. Please don't use it.
 *
 * The members are implemented in function
 * <a href="#ServiceMixin">ServiceMixin</a>
 */
export declare class ServiceMixinDoc {
    constructor(...args: any[]);
    /**
     * Add a service to this application.
     *
     * @param provider - The service provider to register.
     *
     * @example
     * ```ts
     * export interface GeocoderService {
     *   geocode(address: string): Promise<GeoPoint[]>;
     * }
     *
     * export class GeocoderServiceProvider implements Provider<GeocoderService> {
     *   constructor(
     *     @inject('datasources.geocoder')
     *     protected dataSource: juggler.DataSource = new GeocoderDataSource(),
     *   ) {}
     *
     *   value(): Promise<GeocoderService> {
     *     return getService(this.dataSource);
     *   }
     * }
     *
     * app.serviceProvider(GeocoderServiceProvider);
     * ```
     */
    serviceProvider<S>(provider: Constructor<Provider<S>>): Binding<S>;
    /**
     * Add a component to this application. Also mounts
     * all the components services.
     *
     * @param component - The component to add.
     *
     * @example
     * ```ts
     *
     * export class ProductComponent {
     *   controllers = [ProductController];
     *   repositories = [ProductRepo, UserRepo];
     *   providers = {
     *     [AUTHENTICATION_STRATEGY]: AuthStrategy,
     *     [AUTHORIZATION_ROLE]: Role,
     *   };
     * };
     *
     * app.component(ProductComponent);
     * ```
     */
    component(component: Constructor<unknown>): Binding;
    /**
     * Get an instance of a component and mount all it's
     * services. This function is intended to be used internally
     * by component()
     *
     * @param component - The component to mount services of
     */
    mountComponentServices(component: Constructor<unknown>): void;
}
