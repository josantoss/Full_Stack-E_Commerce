// Advanced caching utility for performance optimization
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.maxMemorySize = 50; // Maximum number of items in memory cache
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
  }

  // Set cache item with TTL
  set(key, value, ttl = this.defaultTTL) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };

    this.memoryCache.set(key, item);

    // Implement LRU eviction if cache is full
    if (this.memoryCache.size > this.maxMemorySize) {
      const firstKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(firstKey);
    }

    // Also store in localStorage for persistence
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to store in localStorage:', error);
    }
  }

  // Get cache item
  get(key) {
    // Check memory cache first
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.value;
    }

    // Check localStorage
    try {
      const storedItem = localStorage.getItem(`cache_${key}`);
      if (storedItem) {
        const item = JSON.parse(storedItem);
        if (!this.isExpired(item)) {
          // Restore to memory cache
          this.memoryCache.set(key, item);
          return item.value;
        } else {
          // Remove expired item
          localStorage.removeItem(`cache_${key}`);
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }

    return null;
  }

  // Check if item is expired
  isExpired(item) {
    return Date.now() - item.timestamp > item.ttl;
  }

  // Clear cache
  clear() {
    this.memoryCache.clear();
    
    // Clear localStorage cache items
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  // Remove specific item
  remove(key) {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  // Get cache statistics
  getStats() {
    return {
      memorySize: this.memoryCache.size,
      maxMemorySize: this.maxMemorySize,
      memoryUsage: this.getMemoryUsage()
    };
  }

  // Get memory usage estimate
  getMemoryUsage() {
    let totalSize = 0;
    this.memoryCache.forEach((item, key) => {
      totalSize += key.length + JSON.stringify(item).length;
    });
    return totalSize;
  }
}

// Create global cache instance
const cache = new CacheManager();

// Image preloading utility
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    })
  );
};

// Lazy loading utility
export const lazyLoad = (element, callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });

  observer.observe(element);
  return observer;
};

// Debounce utility for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default cache;
