// Path: @favoverse/shared/src/types/user.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import { TrustLevel, UserRole, VerificationStatus } from '../constants';

// Базовые данные пользователя
export interface BaseUser {
  id: string;
  telegram_id: number;
  username: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// Полная модель пользователя
export interface User extends BaseUser {
  trust_level: TrustLevel;
  role: UserRole;
  settings: UserSettings;
  metadata: UserMetadata;
  verifications: UserVerification[];
  nfts: UserNFT[];
  last_active?: string;
  deleted_at?: string;
}

// Статус пользователя
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned';

// Настройки пользователя
export interface UserSettings {
  notifications: {
    email: boolean;
    telegram: boolean;
    push: boolean;
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    timezone: string;
  };
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
    showNFTs: boolean;
  };
}

// Метаданные пользователя
export interface UserMetadata {
  registrationSource: 'telegram' | 'website' | 'api';
  registrationIP?: string;
  lastLoginAt?: string;
  lastLoginIP?: string;
  deviceInfo?: {
    platform: string;
    browser: string;
    version: string;
  };
  additionalInfo?: Record<string, unknown>;
}

// Верификация пользователя
export interface UserVerification {
  type: VerificationType;
  status: VerificationStatus;
  data: VerificationData;
  verified_at?: string;
  expires_at?: string;
}

// Типы верификации
export type VerificationType = 'email' | 'phone' | 'document' | 'video' | 'social' | 'wallet';

// Данные верификации
export interface VerificationData {
  email?: {
    address: string;
    confirmed: boolean;
  };
  phone?: {
    number: string;
    confirmed: boolean;
    country: string;
  };
  document?: {
    type: 'passport' | 'id_card' | 'driving_license';
    number: string;
    country: string;
    verified: boolean;
  };
  video?: {
    completed: boolean;
    duration: number;
    verified: boolean;
  };
  social?: {
    platform: string;
    username: string;
    verified: boolean;
  };
  wallet?: {
    address: string;
    chain: string;
    verified: boolean;
  };
}

// NFT пользователя
export interface UserNFT {
  id: string;
  type: 'genesis' | 'trust' | 'game';
  contract_address: string;
  token_id: number;
  metadata: NFTMetadata;
  created_at: string;
  updated_at: string;
}

// Метаданные NFT
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
  benefits: {
    trustBonus: number;
    gameBonus: number;
    tradingBonus: number;
  };
}

// Атрибуты NFT
export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

// DTO для создания пользователя
export interface CreateUserDTO {
  telegram_id: number;
  username: string;
  settings?: Partial<UserSettings>;
  metadata?: Partial<UserMetadata>;
}

// DTO для обновления пользователя
export interface UpdateUserDTO {
  settings?: Partial<UserSettings>;
  metadata?: Partial<UserMetadata>;
  status?: UserStatus;
}

// Фильтры для поиска пользователей
export interface UserFilters {
  status?: UserStatus;
  trust_level?: TrustLevel;
  role?: UserRole;
  verification_type?: VerificationType;
  verification_status?: VerificationStatus;
  created_after?: string;
  created_before?: string;
}