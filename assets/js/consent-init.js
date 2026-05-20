window.silktideConsentManager.init({
  consentTypes: [
    {
      id: "necessary",
      label: "Necessary",
      description: "<p>Required for the site to function. Cannot be disabled.</p>",
      required: true
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "<p>Help us understand how visitors use the site so we can improve it.</p>",
      defaultValue: false,
      onAccept: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', { analytics_storage: 'granted' });
        }
      },
      onReject: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
    },
    {
      id: "advertising",
      label: "Advertising",
      description: "<p>Used for personalised ads and remarketing.</p>",
      defaultValue: false,
      onAccept: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
          });
        }
      },
      onReject: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        }
      }
    }
  ]
});
