import { isPlainObject } from "./object"

export function deepCompare(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false
    }

    return a.every((v, i) => deepCompare(v, b[i]))
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const entriesA = Object.entries(a)

    if (entriesA.length !== Object.keys(b).length) {
      return false
    }
    return entriesA.every(([k, v]) => deepCompare(v, b[k]))
  }

  return false
}
