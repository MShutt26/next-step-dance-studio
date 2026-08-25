import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query. Used to keep the registration iframe off
 * phones entirely — a `hidden` iframe would still fetch the (very tall) portal.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)

      return (): void => list.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = useCallback((): boolean => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
