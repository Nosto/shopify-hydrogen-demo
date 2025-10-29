import { ToSnakeCase } from "./types"

// signature override
export function snakeize<T>(obj: T): ToSnakeCase<T>
export function snakeize<T>(obj: T): unknown {
  if (!obj || typeof obj !== "object") {
    return obj
  }
  if (isDate(obj) || isRegex(obj)) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(snakeize) as T
  }
  return Object.keys(obj).reduce((acc, key) => {
    const camel =
      key[0].toLowerCase() +
      key.slice(1).replace(/([A-Z]+)/g, (_, x) => {
        return "_" + x.toLowerCase()
      })
    acc[camel as keyof typeof acc] = snakeize(obj[key as keyof typeof acc])
    return acc
  }, {}) as T
}

function isDate(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object Date]"
}

function isRegex(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object RegExp]"
}
