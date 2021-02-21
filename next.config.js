const withImages = require('next-images')

module.exports = withImages()
module.exports = {
  env: {
    API_KEY: 'AIzaSyDZZu-rQ4UQ7wI4K2EGlExaPW8faMbJJl0',
    AUTH_DOMAIN: 'admin-panel-fce34.firebaseapp.com',
    DATABASE_URL: 'https://admin-panel-fce34-default-rtdb.firebaseio.com',
    PROJECT_ID: 'admin-panel-fce34',
    STORAGE_BUCKET: 'admin-panel-fce34.appspot.com',
    MESSAGING_SENDING_ID: '490188429737',
    APP_ID: '1:490188429737:web:a8c4a70fabf7f2c58e8cb8',
    // MEASUREMENT_ID: 'G-DZVW88E5KY'
  }
}
// module.exports = {
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       require('./scripts/siteMapCreator')
//     }
//     return config;
//   }
// };
