"use client"

/** Tracks the user's prefers-reduced-motion setting reactively. */

import { useSyncExternalStore } from "react"

function subscribeToMediaQuery(query: string, onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(query)
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

const getServerSnapshot = () => false
const subscribeToReducedMotion = (onStoreChange: () => void) =>
  subscribeToMediaQuery("(prefers-reduced-motion: reduce)", onStoreChange)
const subscribeToFinePointer = (onStoreChange: () => void) =>
  subscribeToMediaQuery("(pointer: fine)", onStoreChange)
const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
const getFinePointerSnapshot = () => window.matchMedia("(pointer: fine)").matches
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  )
}
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  )
}
