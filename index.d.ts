
// augmented module
import * as Immutable from 'immutable';

declare module 'immutable' {
  export interface TypedMap<T> extends Immutable.Map<keyof T, any> {
    set<K extends keyof T>(key: K, value: T[K]): this;
    delete(key: keyof T): this;
    remove(key: keyof T): this;
    clear(): this;
    update(updater: (value: this) => this): this;
    update<K extends keyof T>(key: K, updater: (value: T[K]) => T[K]): this;
    update<K extends keyof T>(key: K, notSetValue: T[K], updater: (value: T[K]) => T[K]): this;
    merge<K extends keyof T>(...iterables: Immutable.Iterable<K, T[K]>[]): this;
    merge(...iterables: (this | Partial<T>)[]): this;
    mergeWith<K extends keyof T>(
      merger: (previous?: Partial<T>, next?: Partial<T>, key?: K) => any,
      ...iterables: Immutable.Iterable<K, T[K]>[]
    ): this;
    mergeWith(
      merger: (previous?: Partial<T>, next?: Partial<T>, key?: keyof T) => any,
      ...iterables: (this | Partial<T>)[]
    ): this;
    mergeDeep<K extends keyof T>(...iterables: Immutable.Iterable<K, T[K]>[]): this;
    mergeDeep(...iterables: (this | Partial<T>)[]): this;
    mergeDeepWith<K extends keyof T>(
      merger: (previous?: Partial<T>, next?: Partial<T>, key?: K) => any,
      ...iterables: Immutable.Iterable<K, T[K]>[]
    ): this;
    mergeDeepWith(
      merger: (previous?: Partial<T>, next?: Partial<T>, key?: keyof T) => any,
      ...iterables: (this | Partial<T>)[]
    ): this;
    mergeIn(keyPath: any[] | Immutable.Iterable<any, any>, ...iterables: any[]): this
    mergeDeepIn(keyPath: any[] | Immutable.Iterable<any, any>, ...iterables: any[]): this;
    setIn(keyPath: any[] | Immutable.Iterable<any, any>, value: any): this;
    deleteIn(keyPath: any[] | Immutable.Iterable<any, any>): this;
    removeIn(keyPath: any[] | Immutable.Iterable<any, any>): this;
    updateIn(keyPath: any[] | Immutable.Iterable<any, any>, updater: (value: any) => any): this;
    updateIn(keyPath: any[] | Immutable.Iterable<any, any>, notSetValue: any, updater: (value: any) => any): this;
    withMutations(mutator: (mutable: this) => this): this;
    asMutable(): this;
    asImmutable(): this;
  }

  export type Record<T> = TypedMap<T> & Readonly<T>;

  export namespace Record {
    export interface TypedClass<T> {
      // publish record's interface (to get it, use `typeof FooRecord.T`)
      T: T,
      // publish record's instance type (to get it, use `typeof FooRecord.INSTANCE`)
      INSTANCE: Record<T>;
      // provide 'undefined' placeholder for shorter record's definitions
      UNDEFINED: Record<T>;

      new (): Record<T>;
      new (values: Partial<T>): Record<T>;
      new (values: Iterable<string, any>): Record<T>; // deprecated

      (): Record<T>;
      (values: Partial<T>): Record<T>;
      (values: Iterable<string, any>): Record<T>; // deprecated
    }
  }

  export function Record<T>(defaultValues: T, name?: string): Record.TypedClass<T>;
}
