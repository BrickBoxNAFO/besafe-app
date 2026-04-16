'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check if URL hash contains recovery token
    const hash = window.location.hash;
    
    if (hash && hash.includes('type=recovery')) {
      // Redirect to update-password page while preserving the hash
      router.push(`/update-password${hash}`);
    }
  }, [router]);

  // This component is invisible - it only handles redirects
  return null;
}
