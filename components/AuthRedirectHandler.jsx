'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthRedirectHandler() {
  const router = useRouter()
  
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.includes('type=recovery')) {
      // Move hash to update-password page which knows how to handle it
      router.push('/update-password' + hash)
    }
  }, [])
  
  return null
}