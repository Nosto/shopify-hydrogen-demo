import { useEffect, useRef, useMemo, type EffectCallback, type DependencyList } from "react"
import { deepCompare } from "../utils/compare"

export function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList) {
  return useEffect(callback, useDeepCompareMemoize(dependencies))
}

function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value)
  const signalRef = useRef(0)

  if (!deepCompare(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return useMemo(() => ref.current, [signalRef.current])
}
