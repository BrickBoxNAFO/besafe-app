'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { PRICES, REGIONS, BUNDLE_WAS_PRICES, BUNDLE_SAVINGS, COMPLETE_WAS_PRICES, COMPLETE_SAVINGS, countryToRegion, formatPrice } from '@/lib/pricing'

const PricingContext = createContext(null)

export function PricingProvider({ children }) {
  const [regionCode, setRegionCode] = useState('US')

  useEffect(() => {
    fetch('/api/geo')
      .then(r => r.json())
      .then(d => {
        if (d.country) setRegionCode(countryToRegion(d.country))
      })
      .catch(() => {
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
          if (tz.startsWith('Europe/London')) setRegionCode('GB')
          else if (tz.startsWith('Europe/')) setRegionCode('EU')
          else if (tz.startsWith('Australia/')) setRegionCode('AU')
          else if (tz.startsWith('Pacific/Auckland')) setRegionCode('NZ')
          else if (tz.startsWith('America/Toronto') || tz.startsWith('America/Vancouver') || tz.startsWith('America/Edmonton') || tz.startsWith('America/Winnipeg') || tz.startsWith('America/Halifax')) setRegionCode('CA')
        } catch {}
      })
  }, [])

  const prices = PRICES[regionCode] || PRICES.US
  const region = REGIONS[regionCode] || REGIONS.US

  const packagePrice = (pkgId) => prices[pkgId]
  const format = (amount) => formatPrice(amount, regionCode)
  const bundleWas = BUNDLE_WAS_PRICES[regionCode] || BUNDLE_WAS_PRICES.US
  const bundleSavings = BUNDLE_SAVINGS[regionCode] || BUNDLE_SAVINGS.US
  const completeWas = COMPLETE_WAS_PRICES[regionCode] || COMPLETE_WAS_PRICES.US
  const completeSavings = COMPLETE_SAVINGS[regionCode] || COMPLETE_SAVINGS.US

  return (
    <PricingContext.Provider value={{ packagePrice, format, bundleWas, bundleSavings, completeWas, completeSavings, regionCode, region }}>
      {children}
    </PricingContext.Provider>
  )
}

export function usePricing() {
  const ctx = useContext(PricingContext)
  if (!ctx) {
    const prices = PRICES.US
    return {
      packagePrice: (pkgId) => prices[pkgId],
      format: (amount) => formatPrice(amount, 'US'),
      bundleWas: BUNDLE_WAS_PRICES.US,
      bundleSavings: BUNDLE_SAVINGS.US,
      completeWas: COMPLETE_WAS_PRICES.US,
      completeSavings: COMPLETE_SAVINGS.US,
      regionCode: 'US',
      region: REGIONS.US,
    }
  }
  return ctx
}
