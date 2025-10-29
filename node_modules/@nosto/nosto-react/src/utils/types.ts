export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

// Recursive type to apply the conversion to all keys in an object type
export type ToCamelCase<T> = T extends (infer U)[]
  ? ToCamelCase<U>[]
  : T extends Date
  ? T
  : T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: ToCamelCase<T[K]>
    }
  : T

export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToSnakeCase<U>}`
    : `${Lowercase<T>}_${CamelToSnakeCase<Uncapitalize<U>>}`
  : S

// Recursive type to apply the conversion to all keys in an object type
export type ToSnakeCase<T> = T extends (infer U)[]
  ? ToSnakeCase<U>[]
  : T extends Date
  ? T
  : T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: ToSnakeCase<T[K]>
    }
  : T
