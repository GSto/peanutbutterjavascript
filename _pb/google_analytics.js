
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function trackPageview(url) {
  window.gtag("config",process.env.GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function trackEvent(action, event_category, event_label, value) {
  window.gtag("event", action, {
    event_category, event_label, value
  })
}