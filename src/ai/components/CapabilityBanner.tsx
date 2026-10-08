'use client'
import { useEffect, useState } from 'react'
import { detectCapability, type Capability } from '../lib/capability'

function Icon({ tier }: { tier: Capability['tier'] }) {
  if (tier === 'webgpu') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1l2 4h4l-3 3 1 4-4-2.5L4 12l1-4L2 5h4z" fill="#6c3fff" stroke="#6c3fff" strokeWidth=".5" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (tier === 'unsupported') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="#c0392b" strokeWidth="1.5"/>
        <path d="M8 4v4M8 10v1.5" stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#b8860b" strokeWidth="1.5"/>
      <path d="M8 5v3l2 2" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function CapabilityBanner() {
  const [cap, setCap] = useState<Capability | null>(null)

  useEffect(() => {
    detectCapability().then(setCap)
  }, [])

  if (!cap || cap.tier === 'webgpu') return null

  return (
    <div className={`cap-banner ${cap.tier}`} role="status">
      <Icon tier={cap.tier} />
      <span>{cap.reason}</span>
    </div>
  )
}

/** Returns capability state for use in tool components. */
export function useCapability() {
  const [cap, setCap] = useState<Capability | null>(null)
  useEffect(() => { detectCapability().then(setCap) }, [])
  return cap
}
