// ===================================================================
// Abu Sayeed Frontend - API Configuration
// API URL centralized export
// ===================================================================

/**
 * Centered API Configuration
 * If environment variable is not found, it falls back to localhost for development.
 * For production, set NEXT_PUBLIC_API_URL in Vercel environment variables.
 */
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// For legacy code support (if any file uses API_URL specifically)
export const API_URL = API_BASE_URL;

console.log('🔌 API Base URL:', API_BASE_URL);

