const express = require('express');
const router = express.Router();

// Analytics data storage (in production, use a proper database)
let analyticsData = [];

// Store analytics events
router.post('/', async (req, res) => {
  try {
    const { sessionId, events, sessionDuration } = req.body;

    // Validate request data
    if (!sessionId || !events || !Array.isArray(events)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid analytics data'
      });
    }

    // Store analytics data
    const analyticsEntry = {
      sessionId,
      events,
      sessionDuration,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    analyticsData.push(analyticsEntry);

    // In production, you would store this in a database
    console.log(`[Analytics] Received ${events.length} events from session ${sessionId}`);

    res.json({
      success: true,
      message: 'Analytics data received successfully'
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process analytics data'
    });
  }
});

// Get analytics summary (admin only)
router.get('/summary', async (req, res) => {
  try {
    // In production, implement proper authentication for admin access
    const summary = {
      totalSessions: analyticsData.length,
      totalEvents: analyticsData.reduce((sum, entry) => sum + entry.events.length, 0),
      averageSessionDuration: analyticsData.reduce((sum, entry) => sum + entry.sessionDuration, 0) / analyticsData.length || 0,
      eventsByType: {},
      pageViews: {},
      errors: []
    };

    // Analyze events
    analyticsData.forEach(entry => {
      entry.events.forEach(event => {
        // Count events by type
        summary.eventsByType[event.type] = (summary.eventsByType[event.type] || 0) + 1;

        // Track page views
        if (event.type === 'page_view') {
          summary.pageViews[event.page] = (summary.pageViews[event.page] || 0) + 1;
        }

        // Track errors
        if (event.type === 'error') {
          summary.errors.push({
            message: event.error.message,
            timestamp: event.timestamp,
            url: event.url
          });
        }
      });
    });

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate analytics summary'
    });
  }
});

// Get real-time analytics
router.get('/realtime', async (req, res) => {
  try {
    const now = new Date();
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    const recentSessions = analyticsData.filter(entry => 
      new Date(entry.timestamp) > lastHour
    );

    const realtimeData = {
      activeSessions: recentSessions.length,
      eventsLastHour: recentSessions.reduce((sum, entry) => sum + entry.events.length, 0),
      topPages: {},
      recentErrors: []
    };

    // Analyze recent data
    recentSessions.forEach(entry => {
      entry.events.forEach(event => {
        if (event.type === 'page_view') {
          realtimeData.topPages[event.page] = (realtimeData.topPages[event.page] || 0) + 1;
        }
        if (event.type === 'error') {
          realtimeData.recentErrors.push({
            message: event.error.message,
            timestamp: event.timestamp
          });
        }
      });
    });

    res.json({
      success: true,
      data: realtimeData
    });

  } catch (error) {
    console.error('Realtime analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get realtime analytics'
    });
  }
});

module.exports = router;

