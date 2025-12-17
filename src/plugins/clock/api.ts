import { SunTimes } from './types';

interface CachedSunTimes {
  sunrise: string;
  sunset: string;
  date: string; // YYYY-MM-DD format
  timestamp: number;
}

/**
 * Generate cache key for sun times based on coordinates and date
 */
function getSunTimesCacheKey(latitude: number, longitude: number, date: string): string {
  return `clock_suntimes_${latitude}_${longitude}_${date}`;
}

/**
 * Load cached sun times from storage
 */
async function loadCachedSunTimes(
  latitude: number,
  longitude: number,
  date: string
): Promise<CachedSunTimes | null> {
  return new Promise((resolve) => {
    const cacheKey = getSunTimesCacheKey(latitude, longitude, date);
    
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([cacheKey], (result) => {
        if (chrome.runtime.lastError) {
          console.error('[Sun Times Cache] Failed to load from chrome.storage:', chrome.runtime.lastError.message);
          resolve(null);
          return;
        }
        
        const cached = result[cacheKey];
        if (!cached) {
          resolve(null);
          return;
        }
        
        try {
          const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
          // Verify the cached data is for the same date
          if (data.date === date) {
            resolve(data);
          } else {
            resolve(null);
          }
        } catch (e) {
          console.error('[Sun Times Cache] Failed to parse cached data:', e);
          resolve(null);
        }
      });
    } else {
      // Fallback to localStorage
      try {
        const cached = localStorage.getItem(cacheKey);
        if (!cached) {
          resolve(null);
          return;
        }
        
        const data = JSON.parse(cached);
        // Verify the cached data is for the same date
        if (data.date === date) {
          resolve(data);
        } else {
          resolve(null);
        }
      } catch (e) {
        console.error('[Sun Times Cache] Failed to load from localStorage:', e);
        resolve(null);
      }
    }
  });
}

/**
 * Save sun times to cache
 */
async function saveCachedSunTimes(
  latitude: number,
  longitude: number,
  date: string,
  sunTimes: SunTimes
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cacheKey = getSunTimesCacheKey(latitude, longitude, date);
    const cacheData: CachedSunTimes = {
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      date,
      timestamp: Date.now(),
    };
    
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ [cacheKey]: JSON.stringify(cacheData) }, () => {
        if (chrome.runtime.lastError) {
          console.error('[Sun Times Cache] Failed to save to chrome.storage:', chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    } else {
      // Fallback to localStorage
      try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        resolve();
      } catch (e) {
        console.error('[Sun Times Cache] Failed to save to localStorage:', e);
        reject(e);
      }
    }
  });
}

/**
 * Fetch sunrise and sunset times for a given location
 * Uses the free sunrise-sunset.org API (no API key required)
 * Caches results in localStorage for the current day to avoid unnecessary API calls
 */
export async function fetchSunTimes(
  latitude: number,
  longitude: number
): Promise<SunTimes> {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Check cache first
  const cached = await loadCachedSunTimes(latitude, longitude, dateStr);
  if (cached) {
    return {
      sunrise: cached.sunrise,
      sunset: cached.sunset,
    };
  }
  
  // API returns times in UTC, we'll convert them in the component
  const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${dateStr}&formatted=0`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(data.status || 'Failed to fetch sun times');
    }

    const sunTimes: SunTimes = {
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
    };

    // Cache the result
    try {
      await saveCachedSunTimes(latitude, longitude, dateStr, sunTimes);
    } catch (cacheError) {
      // Don't fail if caching fails, just log it
      console.warn('[Sun Times Cache] Failed to cache sun times:', cacheError);
    }

    return sunTimes;
  } catch (error) {
    console.error('Failed to fetch sun times:', error);
    throw error;
  }
}

/**
 * Get the system timezone
 */
export function getSystemTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // Fallback for older browsers
    const offset = -new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

/**
 * Get timezone display name
 */
export function getTimezoneDisplayName(timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'long',
    });
    const parts = formatter.formatToParts(new Date());
    const tzName = parts.find((part) => part.type === 'timeZoneName')?.value || timezone;
    return tzName;
  } catch {
    return timezone;
  }
}



