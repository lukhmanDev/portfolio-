import api from './api';
import axios from 'axios';
import { API_ENDPOINTS } from './config';

/**
 * Service to post contact details to API backend with smart fallback
 * @param {Object} contactData - { name, email, subject, message }
 * @returns {Promise<Object>} API response data
 */
export const submitContactMessage = async (contactData) => {
  const payload = {
    name: contactData.name,
    email: contactData.email,
    whatsapp_number: contactData.whatsapp_number || '',
    subject: contactData.subject || `Portfolio Inquiry from ${contactData.name}`,
    message: contactData.message,
  };

  // 1. Primary: Use configured api client (uses Vite proxy /api in dev mode to avoid CORS)
  try {
    const response = await api.post(API_ENDPOINTS.MESSAGES, payload);
    return response.data;
  } catch (err) {
    console.warn('Primary API endpoint call failed:', err.message);

    // 2. Secondary: Try relative endpoint /api/messages/ via Vite dev server proxy
    try {
      const response = await axios.post('/api/messages/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (proxyErr) {
      // 3. Tertiary: Try direct production server URL https://api.lhakkeem.in/api/messages/
      try {
        const response = await axios.post('https://api.lhakkeem.in/api/messages/', payload, {
          headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
      } catch (directErr) {
        // 4. Local Django fallback if running on localhost:8000
        try {
          const response = await axios.post('http://localhost:8000/api/messages/', payload, {
            headers: { 'Content-Type': 'application/json' },
          });
          return response.data;
        } catch (localErr) {
          console.error('All API connection attempts failed:', localErr);
          throw localErr;
        }
      }
    }
  }
};
