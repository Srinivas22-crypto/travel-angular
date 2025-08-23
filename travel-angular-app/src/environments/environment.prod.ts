export const environment = {
  production: true,
  apiUrl: 'https://api.travelapp.com/api',
  appName: 'TravelApp',
  version: '1.0.0',
  features: {
    enableAnalytics: true,
    enableLogging: false,
    enableMockData: false,
    enableDevTools: false
  },
  auth: {
    tokenKey: 'travel_app_token',
    refreshTokenKey: 'travel_app_refresh_token',
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
