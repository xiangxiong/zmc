import { Binding, BindingFilter, BindingFromClassOptions, BindingScope, Constructor, Context, Application, Component, MixinTarget } from '@loopback/core';
import { Bootable, Booter, BootOptions, InstanceWithBooters } from '../types';
import * as loopbackContext from '@loopback/core';
export { Binding };
/**
 * Mixin for @loopback/boot. This Mixin provides the following:
 * - Implements the Bootable Interface as follows.
 * - Add a `projectRoot` property to the Class
 * - Adds an optional `bootOptions` property to the Class that can be used to
 *    store the Booter conventions.
 * - Adds the `BootComponent` to the Class (which binds the Bootstrapper and default Booters)
 * - Provides the `boot()` convenience method to call Bootstrapper.boot()
 * - Provides the `booter()` convenience method to bind a Booter(s) to the Application
 * - Override `component()` to call `mountComponentBooters`
 * - Adds `mountComponentBooters` which binds Booters to the application from `component.booters[]`
 *
 * @param superClass - Application class
 * @returns A new class that extends the super class with boot related methods
 *
 * @typeParam T - Type of the application class as the target for the mixin
 */
export declare function BootMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        projectRoot: string;
        bootOptions?: BootOptions | undefined;
        booted: boolean;
        /**
         * Override to detect and warn about starting without booting.
         */
        start(): Promise<void>;
        /**
         * Convenience method to call bootstrapper.boot() by resolving bootstrapper
         */
        boot(): Promise<void>;
        /**
         * Given a N number of Booter Classes, this method binds them using the
         * prefix and tag expected by the Bootstrapper.
         *
         * @param booterCls - Booter classes to bind to the Application
         *
         * @example
         * ```ts
         * app.booters(MyBooter, MyOtherBooter)
         * ```
         */
        booters(...booterCls: Constructor<Booter>[]): Binding[];
        /**
         * Register a booter to boot a sub-application. See
         * {@link createComponentApplicationBooterBinding} for more details.
         *
         * @param subApp - A sub-application with artifacts to be booted
         * @param filter - A binding filter to select what bindings from the sub
         * application should be added to the main application.
         */
        applicationBooter(subApp: Application & Bootable, filter?: BindingFilter | undefined): Binding<Booter>;
        /**
         * Override to ensure any Booter's on a Component are also mounted.
         *
         * @param component - The component to add.
         *
         * @example
         * ```ts
         *
         * export class ProductComponent {
         *   booters = [ControllerBooter, RepositoryBooter];
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
         * booters. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount booters of
         */
        mountComponentBooters(componentInstanceOrClass: Constructor<unknown> | InstanceWithBooters): void;
        readonly options: loopbackContext.ApplicationConfig;
        readonly state: string;
        controller: <T_1>(controllerCtor: loopbackContext.ControllerClass<T_1>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_1>;
        server: <T_2 extends loopbackContext.Server>(ctor: Constructor<T_2>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_2>;
        servers: <T_3 extends loopbackContext.Server>(ctors: Constructor<T_3>[]) => Binding<any>[];
        getServer: <T_4 extends loopbackContext.Server>(target: string | Constructor<T_4>) => Promise<T_4>;
        init: () => Promise<void>;
        onInit: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        onStart: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        stop: () => Promise<void>;
        onStop: (fn: () => loopbackContext.ValueOrPromise<void>) => Binding<loopbackContext.LifeCycleObserver>;
        setMetadata: (metadata: loopbackContext.ApplicationMetadata) => void;
        lifeCycleObserver: <T_5 extends loopbackContext.LifeCycleObserver>(ctor: Constructor<T_5>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_5>;
        service: <S>(cls: loopbackContext.ServiceOrProviderClass<S>, nameOrOptions?: string | loopbackContext.ServiceOptions | undefined) => Binding<S>;
        interceptor: (interceptor: loopbackContext.Interceptor | Constructor<loopbackContext.Provider<loopbackContext.Interceptor>>, nameOrOptions?: string | loopbackContext.InterceptorBindingOptions | undefined) => Binding<loopbackContext.Interceptor>;
        readonly name: string;
        readonly subscriptionManager: loopbackContext.ContextSubscriptionManager;
        scope: BindingScope;
        readonly parent: Context | undefined;
        emitEvent: <T_6 extends loopbackContext.ContextEvent>(type: string, event: T_6) => void;
        emitError: (err: unknown) => void;
        bind: <ValueType = any>(key: loopbackContext.BindingAddress<ValueType>) => Binding<ValueType>;
        add: (binding: Binding<unknown>) => Application;
        configure: <ConfigValueType = any>(key?: loopbackContext.BindingAddress<unknown> | undefined) => Binding<ConfigValueType>;
        getConfigAsValueOrPromise: <ConfigValueType_1>(key: loopbackContext.BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => loopbackContext.ValueOrPromise<ConfigValueType_1 | undefined>;
        getConfig: <ConfigValueType_2>(key: loopbackContext.BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => Promise<ConfigValueType_2 | undefined>;
        getConfigSync: <ConfigValueType_3>(key: loopbackContext.BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: loopbackContext.ResolutionOptions | undefined) => ConfigValueType_3 | undefined;
        unbind: (key: loopbackContext.BindingAddress<unknown>) => boolean;
        subscribe: (observer: loopbackContext.ContextEventObserver) => loopbackContext.Subscription;
        unsubscribe: (observer: loopbackContext.ContextEventObserver) => boolean;
        close: () => void;
        isSubscribed: (observer: loopbackContext.ContextObserver) => boolean;
        createView: <T_7 = unknown>(filter: BindingFilter, comparator?: loopbackContext.BindingComparator | undefined, options?: Omit<loopbackContext.ResolutionOptions, "session"> | undefined) => loopbackContext.ContextView<T_7>;
        contains: (key: loopbackContext.BindingAddress<unknown>) => boolean;
        isBound: (key: loopbackContext.BindingAddress<unknown>) => boolean;
        getOwnerContext: (keyOrBinding: Readonly<Binding<unknown>> | loopbackContext.BindingAddress<unknown>) => Context | undefined;
        getScopedContext: (scope: BindingScope.APPLICATION | BindingScope.SERVER | BindingScope.REQUEST) => Context | undefined;
        getResolutionContext: (binding: Readonly<Binding<unknown>>) => Context | undefined;
        isVisibleTo: (ctx: Context) => boolean;
        find: <ValueType_1 = any>(pattern?: string | RegExp | BindingFilter | undefined) => Readonly<Binding<ValueType_1>>[];
        findByTag: <ValueType_2 = any>(tagFilter: RegExp | loopbackContext.BindingTag) => Readonly<Binding<ValueType_2>>[];
        get: {
            <ValueType_3>(keyWithPath: loopbackContext.BindingAddress<ValueType_3>, session?: loopbackContext.ResolutionSession | undefined): Promise<ValueType_3>;
            <ValueType_4>(keyWithPath: loopbackContext.BindingAddress<ValueType_4>, options: loopbackContext.ResolutionOptions): Promise<ValueType_4 | undefined>;
        };
        getSync: {
            <ValueType_5>(keyWithPath: loopbackContext.BindingAddress<ValueType_5>, session?: loopbackContext.ResolutionSession | undefined): ValueType_5;
            <ValueType_6>(keyWithPath: loopbackContext.BindingAddress<ValueType_6>, options?: loopbackContext.ResolutionOptions | undefined): ValueType_6 | undefined;
        };
        getBinding: {
            <ValueType_7 = any>(key: loopbackContext.BindingAddress<ValueType_7>): Binding<ValueType_7>;
            <ValueType_8>(key: loopbackContext.BindingAddress<ValueType_8>, options?: {
                optional?: boolean | undefined;
            } | undefined): Binding<ValueType_8> | undefined;
        };
        findOrCreateBinding: <T_8>(key: loopbackContext.BindingAddress<T_8>, policy?: loopbackContext.BindingCreationPolicy | undefined) => Binding<T_8>;
        getValueOrPromise: <ValueType_9>(keyWithPath: loopbackContext.BindingAddress<ValueType_9>, optionsOrSession?: loopbackContext.ResolutionOptionsOrSession | undefined) => loopbackContext.ValueOrPromise<ValueType_9 | undefined>;
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
 * Method which binds a given Booter to a given Context with the Prefix and
 * Tags expected by the Bootstrapper
 *
 * @param ctx - The Context to bind the Booter Class
 * @param booterCls - Booter class to be bound
 */
export declare function bindBooter(ctx: Context, booterCls: Constructor<Booter>): Binding;
export declare const _bindBooter: typeof bindBooter;
