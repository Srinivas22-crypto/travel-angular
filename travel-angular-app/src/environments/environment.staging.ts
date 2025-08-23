export const environment = {
  production: false,
  apiUrl: 'https://staging-api.travelapp.com/api',
  appName: 'TravelApp (Staging)',
  version: '1.0.0-staging',
  features: {
    enableAnalytics: true,
    enableLogging: true,
    enableMockData: false,
    enableDevTools: true
  },
  auth: {
    tokenKey: 'travel_app_token_staging',
    refreshTokenKey: 'travel_app_refresh_token_staging',
    tokenExpiry: 24 * 60 * 60 * 1000 // 24 hours
  },
  maps: {
    defaultCenter: [40.7128, -74.0060], // NYC
    defaultZoom: 10,
    tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  },
  ui: {
    toastDuration: 5000,
    errorToastDuration: 7000,
    animationDuration: 300
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100
  }
};
