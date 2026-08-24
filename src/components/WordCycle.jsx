import React, { useEffect, useState } from 'react'

/**
 * Cycles through two parallel word-triads (e.g. GIVE / WITH / UNDERSTANDING
 * transitioning to KNOWLEDGE / SEVA / DHARMA) on a slow interval. Purely
 * decorative reinforcement of the hero message — respects reduced motion by
 * freezing on the first pair.
 */
export default function WordCycle({ wordsA, wordsB }) {
  const [showB, setShowB] = useState(false)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => setShowB((v) => !v), 3200)
    return () => clearInterval(id)
  }, [prefersReduced])

  const words = showB && !prefersReduced ? wordsB : wordsA

  return (
    <div className="hero-cycle">
      {words.map((w, i) => (
        <React.Fragment key={w}>
          <strong>{w}</strong>
          {i < words.length - 1 && <span aria-hidden="true">→</span>}
        </React.Fragment>
      ))}
    </div>
  )
}
