// Path: @favoverse/shared/src/constants/index.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

export * from './api';
export * from './errors';

// Общие константы
export const APP_CONSTANTS = {
  // Уровни доверия и их требования
  TRUST_LEVELS: {
    BASIC: {
      level: 0,
      name: 'Basic',
      requirements: ['email'],
      benefits: {
        maxTransaction: 100,
        canCreateProjects: false,
        nftBonus: 0
      }
    },
    VERIFIED: {
      level: 1,
      name: 'Verified',
      requirements: ['email', 'phone'],
      benefits: {
        maxTransaction: 1000,
        canCreateProjects: true,
        nftBonus: 5
      }
    },
    ADVANCED: {
      level: 2,
      name: 'Advanced',
      requirements: ['email', 'phone', 'document'],
      benefits: {
        maxTransaction: 10000,
        canCreateProjects: true,
        nftBonus: 10
      }
    },
    PREMIUM: {
      level: 3,
      name: 'Premium',
      requirements: ['email', 'phone', 'document', 'video'],
      benefits: {
        maxTransaction: null,
        canCreateProjects: true,
        nftBonus: 15
      }
    }
  },

  // Роли пользователей
  USER_ROLES: {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    SYSTEM: 'system'
  },

  // Статусы верификации
  VERIFICATION_STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired'
  },

  // Типы NFT и их бонусы
  NFT_TYPES: {
    GENESIS: {
      type: 'genesis',
      trustBonus: 20,
      gameBonus: 15,
      tradingBonus: 10
    },
    TRUST: {
      type: 'trust',
      trustBonus: 10,
      gameBonus: 5,
      tradingBonus: 5
    },
    GAME: {
      type: 'game',
      trustBonus: 5,
      gameBonus: 10,
      tradingBonus: 0
    }
  },

  // Временные интервалы
  TIME: {
    VERIFICATION_EXPIRY: 15 * 60 * 1000, // 15 минут
    SESSION_EXPIRY: 24 * 60 * 60 * 1000, // 24 часа
    TOKEN_EXPIRY: 1 * 60 * 60 * 1000,    // 1 час
    CACHE_EXPIRY: 30 * 60 * 1000         // 30 минут
  },

  // Лимиты системы
  LIMITS: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_REQUESTS_PER_MINUTE: 60,
    MAX_FAILED_ATTEMPTS: 5,
    MAX_CONCURRENT_SESSIONS: 3
  },

  // События для WebSocket
  WEBSOCKET_EVENTS: {
    USER: {
      UPDATE: 'user.update',
      TRUST_CHANGE: 'user.trust.change',
      NFT_UPDATE: 'user.nft.update'
    },
    GAME: {
      START: 'game.start',
      PROGRESS: 'game.progress',
      COMPLETE: 'game.complete'
    },
    VERIFICATION: {
      START: 'verification.start',
      UPDATE: 'verification.update',
      COMPLETE: 'verification.complete'
    }
  }
} as const;

// Создаем типы из констант
export type TrustLevel = keyof typeof APP_CONSTANTS.TRUST_LEVELS;
export type UserRole = keyof typeof APP_CONSTANTS.USER_ROLES;
export type VerificationStatus = keyof typeof APP_CONSTANTS.VERIFICATION_STATUSES;
export type NftType = keyof typeof APP_CONSTANTS.NFT_TYPES;
export type WebSocketEvent = keyof typeof APP_CONSTANTS.WEBSOCKET_EVENTS;