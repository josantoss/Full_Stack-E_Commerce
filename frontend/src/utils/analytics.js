// Analytics utility for tracking user interactions and performance
class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track page views
  trackPageView(pageName, additionalData = {}) {
    const event = {
      type: 'page_view',
      page: pageName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      ...additionalData
    };

    this.events.push(event);
    this.logEvent('Page View', pageName);
  }

  // Track user interactions
  trackEvent(eventName, category, action, label = null, value = null) {
    const event = {
      type: 'event',
      name: eventName,
      category: category,
      action: action,
      label: label,
      value: value,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href,
      ...this.getUserContext()
    };

    this.events.push(event);
    this.logEvent(eventName, `${category} - ${action}`);
  }

  // Track e-commerce events
  trackEcommerce(action, product = null, order = null) {
    const event = {
      type: 'ecommerce',
      action: action,
      product: product,
      order: order,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href,
      ...this.getUserContext()
    };

    this.events.push(event);
    this.logEvent('E-commerce', action);
  }

  // Track performance metrics
  trackPerformance(metricName, value, unit = 'ms') {
    const event = {
      type: 'performance',
      metric: metricName,
      value: value,
      unit: unit,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href
    };

    this.events.push(event);
    this.logEvent('Performance', `${metricName}: ${value}${unit}`);
  }

  // Track errors
  trackError(error, context = {}) {
    const event = {
      type: 'error',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context: context,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href,
      ...this.getUserContext()
    };

    this.events.push(event);
    this.logEvent('Error', error.message);
  }

  // Get user context
  getUserContext() {
    return {
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine
    };
  }

  // Log event to console (for development)
  logEvent(type, message) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${type}: ${message}`);
    }
  }

  // Send events to server
  async sendEvents() {
    if (this.events.length === 0) return;

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events,
          sessionDuration: Date.now() - this.startTime
        })
      });

      if (response.ok) {
        this.events = []; // Clear sent events
      }
    } catch (error) {
      console.error('Failed to send analytics events:', error);
    }
  }

  // Initialize analytics
  init() {
    // Track initial page view
    this.trackPageView(document.title);

    // Track performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          this.trackPerformance('page_load_time', perfData.loadEventEnd - perfData.loadEventStart);
          this.trackPerformance('dom_content_loaded', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
        }
      }, 0);
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', 'engagement', 'visibility_change');
      } else {
        this.trackEvent('page_visible', 'engagement', 'visibility_change');
      }
    });

    // Track online/offline status
    window.addEventListener('online', () => {
      this.trackEvent('connection_online', 'system', 'connection_change');
    });

    window.addEventListener('offline', () => {
      this.trackEvent('connection_offline', 'system', 'connection_change');
    });

    // Send events periodically
    setInterval(() => {
      this.sendEvents();
    }, 30000); // Send every 30 seconds

    // Send events before page unload
    window.addEventListener('beforeunload', () => {
      this.sendEvents();
    });
  }
}

// Create global analytics instance
const analytics = new Analytics();

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => analytics.init());
} else {
  analytics.init();
}

export default analytics;

