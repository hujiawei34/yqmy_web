// Centralize API base URL for all builds.
// Update this to match your backend host for each environment.
// Recommendations:
// - For emulators/simulators: use your machine LAN IP, e.g. http://192.168.1.10:8080
// - For real devices on same Wi‑Fi: same LAN IP or a public HTTPS endpoint
// - Avoid using localhost in device/simulator builds; it points to the device itself

// #ifdef MP-WEIXIN
export const API_BASE_URL = 'https://yaoqianmeiyong.site/api';
// #endif

// #ifdef H5
export const API_BASE_URL = 'http://localhost:8080/api';
// #endif

// #ifdef APP-PLUS
// Replace with your machine IP during development as needed
export const API_BASE_URL = 'http://192.168.0.100:8080/api';
// #endif

// #ifdef APP-HARMONY
// Replace with your machine IP during development as needed
export const API_BASE_URL = 'http://192.168.0.100:8080/api';
// #endif

// CommonJS fallback for some build tools/environments
// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && module.exports) {
  // eslint-disable-next-line no-undef
  module.exports = { API_BASE_URL };
}

