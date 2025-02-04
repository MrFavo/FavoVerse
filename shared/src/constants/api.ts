// Path: @favoverse/shared/src/constants/api.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

export type ServiceEndpoint = {
  readonly path: string;
  readonly method: HttpMethod;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Базовые URL для сервисов
export const BASE_URLS = {
  FAVOTRUST: process.env.FAVOTRUST_URL || 'https://api.favotrust.com',
  FAVOCOIN: process.env.FAVOCOIN_URL || 'https://api.favocoin.com',
  MRFAVO: process.env.MRFAVO_URL || 'https://api.mrfavo.com',
  FAVOGAME: process.env.FAVOGAME_URL || 'https://api.favogame.com'
} as const;

// Методы HTTP
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const;

// FavoTrust эндпоинты с типизацией
export const FAVOTRUST_ENDPOINTS = {
  AUTH: {
    LOGIN: { path: '/auth/login', method: HTTP_METHODS.POST },
    LOGOUT: { path: '/auth/logout', method: HTTP_METHODS.POST },
    REFRESH: { path: '/auth/refresh', method: HTTP_METHODS.POST },
    VERIFY: { path: '/auth/verify', method: HTTP_METHODS.POST }
  },
  USERS: {
    BASE: { path: '/users', method: HTTP_METHODS.GET },
    PROFILE: (userId: string): ServiceEndpoint => ({
      path: `/users/${userId}`,
      method: HTTP_METHODS.GET
    }),
    UPDATE: (userId: string): ServiceEndpoint => ({
      path: `/users/${userId}`,
      method: HTTP_METHODS.PUT
    }),
    TRUST_LEVEL: (userId: string): ServiceEndpoint => ({
      path: `/users/${userId}/trust-level`,
      method: HTTP_METHODS.GET
    })
  }
} as const;

// FavoCoin эндпоинты
export const FAVOCOIN_ENDPOINTS = {
  TRUST: {
    VERIFY: { path: '/trust/verify', method: HTTP_METHODS.POST },
    UPDATE: { path: '/trust/update', method: HTTP_METHODS.PUT },
    STATUS: { path: '/trust/status', method: HTTP_METHODS.GET }
  },
  NFT: {
    VERIFY: { path: '/nft/verify', method: HTTP_METHODS.POST },
    MINT: { path: '/nft/mint', method: HTTP_METHODS.POST },
    BURN: { path: '/nft/burn', method: HTTP_METHODS.POST }
  }
} as const;

// Заголовки
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  API_KEY: 'X-API-Key',
  SIGNATURE: 'X-Signature',
  TIMESTAMP: 'X-Timestamp'
} as const;

// Типы контента
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data'
} as const;

// Коды состояния
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500
} as const;

// Настройки запросов
export const REQUEST_CONFIG = {
  TIMEOUTS: {
    DEFAULT: 30000,
    UPLOAD: 60000,
    DOWNLOAD: 60000
  },
  RETRIES: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    MULTIPLIER: 2
  }
} as const;

// Версии API
export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2'
} as const;