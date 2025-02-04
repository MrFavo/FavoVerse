// Path: @favoverse/shared/src/types/verification.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import { VerificationStatus } from '../constants';
import { User, VerificationType } from './user';

// Основная модель верификации
export interface Verification {
  id: string;
  user_id: string;
  type: VerificationType;
  status: VerificationStatus;
  data: VerificationDataType;
  metadata: VerificationMetadata;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Метаданные верификации
export interface VerificationMetadata {
  attempt_count: number;
  last_attempt?: string;
  ip_address?: string;
  source: 'telegram' | 'website' | 'api';
  device_info?: {
    platform: string;
    browser: string;
    version: string;
  };
  location?: {
    country: string;
    city: string;
    coordinates?: [number, number];
  };
}

// Объединение всех возможных типов данных верификации
export type VerificationDataType =
  | EmailVerificationData
  | PhoneVerificationData
  | DocumentVerificationData
  | VideoVerificationData
  | SocialVerificationData
  | WalletVerificationData;

// Данные email верификации
export interface EmailVerificationData {
  email: string;
  code?: string;
  confirmed: boolean;
  confirmation_attempts: number;
}

// Данные телефонной верификации
export interface PhoneVerificationData {
  phone_number: string;
  country_code: string;
  code?: string;
  confirmed: boolean;
  confirmation_attempts: number;
  provider_metadata?: {
    service: string;
    message_id?: string;
    status?: string;
  };
}

// Данные документов
export interface DocumentVerificationData {
  document_type: 'passport' | 'id_card' | 'driving_license';
  document_number: string;
  issuing_country: string;
  expiry_date?: string;
  files: {
    front?: string;
    back?: string;
    selfie?: string;
  };
  verification_provider?: {
    name: string;
    reference_id?: string;
    score?: number;
    details?: Record<string, unknown>;
  };
}

// Данные видео верификации
export interface VideoVerificationData {
  video_url?: string;
  duration: number;
  file_size: number;
  gestures_completed: boolean;
  face_matched: boolean;
  provider_metadata?: {
    service: string;
    reference_id?: string;
    confidence_score?: number;
    face_match_score?: number;
  };
}

// Данные социальной верификации
export interface SocialVerificationData {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'github';
  profile_url: string;
  username: string;
  followers_count?: number;
  account_age?: number;
  verification_post_id?: string;
  verified: boolean;
}

// Данные верификации кошелька
export interface WalletVerificationData {
  address: string;
  chain: string;
  balance?: string;
  nft_count?: number;
  signature?: string;
  message?: string;
  verified: boolean;
}

// DTO для создания верификации
export interface CreateVerificationDTO {
  type: VerificationType;
  data: Partial<VerificationDataType>;
  metadata?: Partial<VerificationMetadata>;
}

// DTO для обновления верификации
export interface UpdateVerificationDTO {
  status?: VerificationStatus;
  data?: Partial<VerificationDataType>;
  metadata?: Partial<VerificationMetadata>;
}

// Параметры для проверки верификации
export interface VerificationCheckParams {
  user: User;
  type: VerificationType;
  required_level?: number;
  check_expiry?: boolean;
}

// Результат проверки верификации
export interface VerificationCheckResult {
  valid: boolean;
  status: VerificationStatus;
  expires_at?: string;
  metadata?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
}