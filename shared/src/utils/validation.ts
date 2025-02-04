// Path: @favoverse/shared/src/utils/validation.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import { z } from 'zod';
import { ERROR_CODES } from '../constants';
import { AppError } from '../constants/errors';

// Базовые схемы валидации
export const basicSchemas = {
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(64, 'Username must be less than 64 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),

  phone: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format. Must start with + and contain 1-15 digits'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  walletAddress: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum wallet address'),

  telegramId: z.number()
    .int('Telegram ID must be an integer')
    .positive('Telegram ID must be positive'),
};

// Функции валидации
export const validators = {
  /**
   * Проверка валидности email
   */
  isValidEmail: (email: string): boolean => {
    try {
      basicSchemas.email.parse(email);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Проверка валидности телефона
   */
  isValidPhone: (phone: string): boolean => {
    try {
      basicSchemas.phone.parse(phone);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Проверка валидности кошелька
   */
  isValidWallet: (address: string): boolean => {
    try {
      basicSchemas.walletAddress.parse(address);
      return true;
    } catch {
      return false;
    }
  }
};

// Функции для проверки данных с выбросом ошибок
export const validateOrThrow = {
  /**
   * Проверка email с выбросом ошибки
   */
  email: (email: string): void => {
    try {
      basicSchemas.email.parse(email);
    } catch {
      throw new AppError(ERROR_CODES.VALIDATION.INVALID_FORMAT, 'Invalid email format');
    }
  },

  /**
   * Проверка телефона с выбросом ошибки
   */
  phone: (phone: string): void => {
    try {
      basicSchemas.phone.parse(phone);
    } catch {
      throw new AppError(ERROR_CODES.VALIDATION.INVALID_FORMAT, 'Invalid phone format');
    }
  },

  /**
   * Проверка username с выбросом ошибки
   */
  username: (username: string): void => {
    try {
      basicSchemas.username.parse(username);
    } catch {
      throw new AppError(ERROR_CODES.VALIDATION.INVALID_FORMAT, 'Invalid username format');
    }
  }
};

// Вспомогательные функции для валидации
export const validationHelpers = {
  /**
   * Проверка, что все требуемые поля присутствуют
   */
  checkRequiredFields: <T extends object>(
    data: T,
    requiredFields: (keyof T)[]
  ): void => {
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) {
      throw new AppError(
        ERROR_CODES.VALIDATION.MISSING_FIELD,
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }
  },

  /**
   * Проверка диапазона чисел
   */
  checkNumberRange: (
    value: number,
    min: number,
    max: number,
    fieldName: string
  ): void => {
    if (value < min || value > max) {
      throw new AppError(
        ERROR_CODES.VALIDATION.INVALID_FORMAT,
        `${fieldName} must be between ${min} and ${max}`
      );
    }
  },

  /**
   * Проверка размера файла
   */
  checkFileSize: (size: number, maxSize: number): void => {
    if (size > maxSize) {
      throw new AppError(
        ERROR_CODES.VALIDATION.INVALID_FORMAT,
        `File size exceeds maximum allowed size of ${maxSize} bytes`
      );
    }
  }
};

export const safeValidate = {
  /**
   * Безопасная валидация с возвратом результата
   */
  validate: <T>(
    schema: z.ZodType<T>,
    data: unknown
  ): { success: true; data: T } | { success: false; error: string } => {
    try {
      const validated = schema.parse(data);
      return { success: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Validation failed' };
    }
  }
};