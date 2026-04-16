'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hse_cookie_consent';

export function resetCookieConsent() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('cookie-consent-reset'));
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // Load saved preferences and show banner if needed
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        setIsVisible(true);
      }
    }

    // Listen for reset events
    const handleReset = () => {
      setIsVisible(true);
      setShowCustomize(false);
    };
    window.addEventListener('cookie-consent-reset', handleReset);
    return () => window.removeEventListener('cookie-consent-reset', handleReset);
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConsent));
    setPreferences(allConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalConsent));
    setPreferences(minimalConsent);
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setIsVisible(false);
    setShowCustomize(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {!showCustomize ? (
          <>
            {/* Main Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-dark mb-2">Cookie Preferences</h3>
                <p className="text-gray-600 text-sm">
                  We use cookies to improve your experience, analyze site usage, and deliver personalized content.
                  You can customize your preferences or accept all.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowCustomize(true)}
                  className="px-4 py-2 text-sm font-semibold text-navy-dark bg-slate-light rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-semibold text-white bg-teal-accent rounded-lg hover:bg-teal-accent/90 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Customization Panel */}
            <div>
              <h3 className="text-lg font-bold text-navy-dark mb-4">Customize Cookie Preferences</h3>
              <div className="space-y-3 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="essential"
                    checked={true}
                    disabled
                    className="mt-1 w-4 h-4 rounded text-teal-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor="essential" className="font-semibold text-gray-800">
                      Essential Cookies
                    </label>
                    <p className="text-sm text-gray-600">
                      Required for core functionality. Always enabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-teal-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor="analytics" className="font-semibold text-gray-800">
                      Analytics Cookies
                    </label>
                    <p className="text-sm text-gray-600">
                      Help us understand how you use our site to improve your experience.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-teal-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor="marketing" className="font-semibold text-gray-800">
                      Marketing Cookies
                    </label>
                    <p className="text-sm text-gray-600">
                      Allow us to show you relevant content and measure campaign effectiveness.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 text-sm font-semibold text-white bg-teal-accent rounded-lg hover:bg-teal-accent/90 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
