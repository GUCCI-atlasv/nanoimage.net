/**
 * Capability detection & degradation (PRD §4.2).
 *
 * Three tiers, decided at page load:
 *  - webgpu : full features, best speed
 *  - wasm   : lighter models, "will be slower" notice
 *  - unsupported : heavy features disabled, never fail silently
 */
export type CapabilityTier = 'webgpu' | 'wasm' | 'unsupported'

export type Capability = {
  tier: CapabilityTier
  hasWebGPU: boolean
  /** navigator.deviceMemory in GB when available. */
  deviceMemoryGb: number | null
  /** logical CPU cores. */
  cores: number | null
  isMobile: boolean
  reason: string
}

const UNKNOWN: Capability = {
  tier: 'wasm',
  hasWebGPU: false,
  deviceMemoryGb: null,
  cores: null,
  isMobile: false,
  reason: 'Detecting…',
}

export async function detectCapability(): Promise<Capability> {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return UNKNOWN
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number
    gpu?: { requestAdapter: () => Promise<unknown | null> }
  }

  const deviceMemoryGb = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null
  const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : null
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(nav.userAgent || '')

  let hasWebGPU = false
  if (nav.gpu && typeof nav.gpu.requestAdapter === 'function') {
    try {
      const adapter = await nav.gpu.requestAdapter()
      hasWebGPU = adapter != null
    } catch {
      hasWebGPU = false
    }
  }

  // Treat very low-memory devices as unsupported for heavy work.
  const veryLowMemory = deviceMemoryGb != null && deviceMemoryGb <= 1

  let tier: CapabilityTier
  let reason: string
  if (veryLowMemory) {
    tier = 'unsupported'
    reason = 'This device has very limited memory; heavy AI features are disabled.'
  } else if (hasWebGPU) {
    tier = 'webgpu'
    reason = 'WebGPU is available — full speed, on-device.'
  } else {
    tier = 'wasm'
    reason = 'Running on WASM — works everywhere, just a bit slower.'
  }

  return { tier, hasWebGPU, deviceMemoryGb, cores, isMobile, reason }
}

/**
 * Whether a feature of a given model size should be allowed / warned on this
 * device. Used to gate heavy features (PRD §4.2, §11).
 */
export function canRunModel(cap: Capability, modelSizeMb: number): {
  allowed: boolean
  warn: boolean
  message?: string
} {
  if (cap.tier === 'unsupported') {
    return {
      allowed: false,
      warn: true,
      message:
        'Your browser or device can’t run on-device AI here. Try a desktop Chrome/Edge 113+ — or use the non-AI tools on this site.',
    }
  }
  const heavy = modelSizeMb >= 150
  if (heavy && cap.tier === 'wasm') {
    return {
      allowed: true,
      warn: true,
      message:
        'This is a large model and your device falls back to WASM — it will be slow. Consider a WebGPU browser for a smoother experience.',
    }
  }
  if (cap.tier === 'wasm') {
    return { allowed: true, warn: true, message: 'No WebGPU detected — processing will be slower.' }
  }
  return { allowed: true, warn: false }
}
