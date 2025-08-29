export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'TravelApp',
  version: '1.0.0',
  features: {
    enableAnalytics: false,
    enablePushNotifications: true,
    enableOfflineMode: false
  },
  external: {
    googleMapsApiKey: '',
    stripePublicKey: '',
    firebaseConfig: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    }
  }
};
