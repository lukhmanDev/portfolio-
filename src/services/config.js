// Base API configuration and endpoints
// In local development, use relative '' to leverage Vite proxy and bypass browser CORS.
const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
const envUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL;

export const BASE_URL = isDev ? '' : (envUrl || 'https://api.lhakkeem.in');

export const API_ENDPOINTS = {
  MESSAGES: '/api/messages/',
};
