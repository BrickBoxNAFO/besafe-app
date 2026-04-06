'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getRegionPricing, formatPrice, REGIONS } from '@/lib/pricing'

const PricingContext = createContext(null)

function getCookie(name) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export function PricingProvider({ children, initialRegion }) {
  const [regionCode, setRegionCode] = useState(initialRegion || 'US')

  useEffect(() => {
    // Read the region cookie set by middleware
    const cookieRegion = getCookie('pricing_region')
    if (cookieRegion && REGIONS[cookieRegion]) {
      setRegionCode(cookieRegion)
    }
  }, [])

  const pricing = getRegionPricing(regionCode)

  const value = {
    regionCode,
    region: pricing.region,
    prices: pricing.prices,
    bundleWas: pricing.bundleWas,
    bundleSavings: pricing.bundleSavings,
    completeWas: pricing.completeWas,
    completeSavings: pricing.completeSavings,
    /** Format a number as a price string for the current region */
    format: (amount) => formatPrice(amount, regionCode),
    /** Get formatted price for a specific package */
    packagePrice: (packageId) => {
      const amount = pricing.prices[packageId]
      return amount != null ? formatPrice(amount, regionCode) : null
    },
  }

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  )
}

export function usePricing() {
  const ctx = useContext(PricingContext)
  if (!ctx) {
    // Fallback for components rendered outside provider (shouldn't happen, but safe)
    const fallback = getRegionPricing('US')
    return {
      regionCode: 'US',
      ...fallback,
      format: (amount) => formatPrice(amount, 'US'),
      packagePrice: (packageId) => {
        const p = fallback.prices[packageId]
        return p != null ? formatPrice(p, 'US') : null
      },
    }
  }
  return ctx
}
