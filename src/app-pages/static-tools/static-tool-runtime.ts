'use client'
import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Runtime helpers for the "static" tools whose behaviour lives in vanilla scripts
 * under /public/assets (gif-compressor, webp-convert, bmp-convert).
 *
 * Those scripts bind to the DOM once, at execution time, and have no teardown. That
 * conflicts with client-side navigation (the DOM is replaced, the script URL is
 * already "loaded") and with React Strict Mode (effects run twice). So:
 *   - every mount injects a *fresh* script instance (unique query string), which
 *     binds to the DOM that is currently on screen;
 *   - a data attribute on the wrapper element guards against double-binding when
 *     Strict Mode remounts the same DOM node.
 */

const BOUND_ATTR = 'data-static-tool-bound'
let instanceCounter = 0

function injectScript(src: string, opts: { module?: boolean; unique?: boolean } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = opts.unique
      ? `${src}${src.includes('?') ? '&' : '?'}r=${Date.now().toString(36)}-${instanceCounter++}`
      : src
    const el = document.createElement('script')
    el.src = url
    el.async = true
    if (opts.module) el.type = 'module'
    el.onload = () => {
      el.remove()
      resolve()
    }
    el.onerror = () => {
      el.remove()
      reject(new Error(`Failed to load ${src}`))
    }
    document.body.appendChild(el)
  })
}

/** Load a classic script once per page (no re-execution on later mounts). */
const loadedOnce = new Map<string, Promise<void>>()
export function loadScriptOnce(src: string): Promise<void> {
  let p = loadedOnce.get(src)
  if (!p) {
    p = injectScript(src).catch((err) => {
      loadedOnce.delete(src)
      throw err
    })
    loadedOnce.set(src, p)
  }
  return p
}

/** Execute a classic script again for this mount (it binds to the current DOM). */
export function runClassicScript(src: string): Promise<void> {
  return injectScript(src, { unique: true })
}

/** Execute an ES-module script again for this mount (cache-busted so it re-evaluates). */
export function runModuleScript(src: string): Promise<void> {
  return injectScript(src, { module: true, unique: true })
}

/**
 * Run `boot` once for the element behind `rootRef` — safe under Strict Mode and
 * re-renders. A real unmount/remount produces a new DOM node, so it boots again.
 */
export function useStaticToolBoot(rootRef: RefObject<HTMLElement | null>, boot: () => Promise<void> | void): void {
  useEffect(() => {
    const root = rootRef.current
    if (!root || root.getAttribute(BOUND_ATTR) === '1') return
    root.setAttribute(BOUND_ATTR, '1')
    Promise.resolve()
      .then(boot)
      .catch((err) => {
        console.error('[static-tool] failed to start', err)
      })
    // `boot` closes over static values only (slug/mode), so it is intentionally not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef])
}

declare global {
  interface Window {
    __WEBP_CONVERT__?: { mode: 'png' | 'jpg'; maxFiles: number }
    __BMP_CONVERT__?: { maxFiles: number }
    GifReader?: unknown
  }
}
