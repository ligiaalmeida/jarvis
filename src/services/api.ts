import axios from 'axios';
import env from 'constants/env';

const URI_BASE = process.env.NODE_ENV === 'development' ? env.development.APP_WS_URL_BASE : env.host.APP_WS_URL;

const api = (params?: string) =>
  axios.create({
    baseURL: `${URI_BASE}${params || '/jarvis/api/socket/'}`,
  });

export default api;
