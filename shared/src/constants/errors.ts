// Path: @favoverse/shared/src/constants/errors.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

// Базовый интерфейс для ошибок
export interface AppErrorType {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Типы ошибок
export enum ErrorType {
  AUTH = 'auth',
  VALIDATION = 'validation',
  BUSINESS = 'business',
  SYSTEM = 'system'
}

// Коды ошибок
export const ERROR_CODES = {
  // Аутентификация (1xxx)
  AUTH: {
    INVALID_CREDENTIALS: '1001',
    TOKEN_EXPIRED: '1002',
    INVALID_TOKEN: '1003',
    INVALID_REFRESH_TOKEN: '1004',
    SESSION_EXPIRED: '1005',
    ACCOUNT_LOCKED: '1006',
    INVALID_2FA: '1007'
  },

  // Верификация (2xxx)
  VERIFICATION: {
    INVALID_CODE: '2001',
    EXPIRED_CODE: '2002',
    TOO_MANY_ATTEMPTS: '2003',
    ALREADY_VERIFIED: '2004',
    INVALID_DOCUMENT: '2005',
    VERIFICATION_FAILED: '2006',
    INSUFFICIENT_TRUST_LEVEL: '2007'
  },

  // NFT и токены (3xxx)
  NFT: {
    INVALID_CONTRACT: '3001',
    INVALID_TOKEN: '3002',
    TRANSFER_FAILED: '3003',
    MINT_FAILED: '3004',
    BURN_FAILED: '3005',
    ALREADY_MINTED: '3006'
  },

  // Игровые ошибки (4xxx)
  GAME: {
    INVALID_ACTION: '4001',
    INSUFFICIENT_RESOURCES: '4002',
    COOLDOWN_ACTIVE: '4003',
    QUEST_UNAVAILABLE: '4004',
    INVALID_GAME_STATE: '4005'
  },

  // Системные ошибки (5xxx)
  SYSTEM: {
    INTERNAL_ERROR: '5001',
    DATABASE_ERROR: '5002',
    CACHE_ERROR: '5003',
    RATE_LIMIT_EXCEEDED: '5004',
    SERVICE_UNAVAILABLE: '5005'
  }
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES: Record<string, string> = {
  // Аутентификация
  [ERROR_CODES.AUTH.INVALID_CREDENTIALS]: 'Invalid username or password',
  [ERROR_CODES.AUTH.TOKEN_EXPIRED]: 'Authentication token has expired',
  [ERROR_CODES.AUTH.INVALID_TOKEN]: 'Invalid authentication token',
  [ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN]: 'Invalid refresh token',
  [ERROR_CODES.AUTH.SESSION_EXPIRED]: 'Session has expired',
  [ERROR_CODES.AUTH.ACCOUNT_LOCKED]: 'Account is locked',
  [ERROR_CODES.AUTH.INVALID_2FA]: 'Invalid 2FA code',

  // Верификация
  [ERROR_CODES.VERIFICATION.INVALID_CODE]: 'Invalid verification code',
  [ERROR_CODES.VERIFICATION.EXPIRED_CODE]: 'Verification code has expired',
  [ERROR_CODES.VERIFICATION.TOO_MANY_ATTEMPTS]: 'Too many verification attempts',
  [ERROR_CODES.VERIFICATION.ALREADY_VERIFIED]: 'Already verified',
  [ERROR_CODES.VERIFICATION.INVALID_DOCUMENT]: 'Invalid document provided',
  [ERROR_CODES.VERIFICATION.VERIFICATION_FAILED]: 'Verification process failed',
  [ERROR_CODES.VERIFICATION.INSUFFICIENT_TRUST_LEVEL]: 'Insufficient trust level for this operation',

  // NFT и токены
  [ERROR_CODES.NFT.INVALID_CONTRACT]: 'Invalid NFT contract address',
  [ERROR_CODES.NFT.INVALID_TOKEN]: 'Invalid NFT token ID',
  [ERROR_CODES.NFT.TRANSFER_FAILED]: 'NFT transfer failed',
  [ERROR_CODES.NFT.MINT_FAILED]: 'NFT minting failed',
  [ERROR_CODES.NFT.BURN_FAILED]: 'NFT burning failed',
  [ERROR_CODES.NFT.ALREADY_MINTED]: 'NFT already minted',

  // Игровые ошибки
  [ERROR_CODES.GAME.INVALID_ACTION]: 'Invalid game action',
  [ERROR_CODES.GAME.INSUFFICIENT_RESOURCES]: 'Insufficient resources',
  [ERROR_CODES.GAME.COOLDOWN_ACTIVE]: 'Action is on cooldown',
  [ERROR_CODES.GAME.QUEST_UNAVAILABLE]: 'Quest is not available',
  [ERROR_CODES.GAME.INVALID_GAME_STATE]: 'Invalid game state',

  // Системные ошибки
  [ERROR_CODES.SYSTEM.INTERNAL_ERROR]: 'Internal server error',
  [ERROR_CODES.SYSTEM.DATABASE_ERROR]: 'Database error',
  [ERROR_CODES.SYSTEM.CACHE_ERROR]: 'Cache error',
  [ERROR_CODES.SYSTEM.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [ERROR_CODES.SYSTEM.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable'
};

// Класс для создания ошибок
export class AppError extends Error implements AppErrorType {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly type: ErrorType;

  constructor(code: string, message?: string, details?: Record<string, unknown>) {
    super(message || ERROR_MESSAGES[code] || 'Unknown error');
    this.code = code;
    this.details = details;
    this.type = this.determineErrorType(code);

    // Для правильного наследования в TypeScript
    Object.setPrototypeOf(this, AppError.prototype);
  }

  private determineErrorType(code: string): ErrorType {
    const prefix = code.charAt(0);
    switch (prefix) {
      case '1':
        return ErrorType.AUTH;
      case '2':
      case '3':
      case '4':
        return ErrorType.BUSINESS;
      case '5':
        return ErrorType.SYSTEM;
      default:
        return ErrorType.VALIDATION;
    }
  }

  public toJSON(): AppErrorType {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}

// Хелперы для создания ошибок
export const createError = (
  code: string,
  details?: Record<string, unknown>
): AppError => {
  return new AppError(code, undefined, details);
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};