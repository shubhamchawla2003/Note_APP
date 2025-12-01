// Central API base URL. Uses Vite env var `VITE_API_BASE` when available,
// otherwise falls back to the production backend you provided.
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://note-app-backend-topaz.vercel.app';

export const NotesEndpoint = (path = '') => `${API_BASE}/api/note${path}`;
export const AuthEndpoint = (path = '') => `${API_BASE}/api/auth${path}`;
