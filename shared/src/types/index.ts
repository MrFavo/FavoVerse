// Path: @favoverse/shared/src/types/index.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

// Экспортируем все типы пользователей
export * from './user';
export * from './verification';

// Дополнительные общие типы для всей экосистемы
export interface PaginationParams {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Общие типы для фильтрации
export interface DateRangeFilter {
  from?: string;
  to?: string;
}

export interface CommonFilters {
  search?: string;
  date_range?: DateRangeFilter;
  status?: string[];
  created_at?: DateRangeFilter;
  updated_at?: DateRangeFilter;
}

// Типы для API ответов
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

// Типы для WebSocket событий
export interface WebSocketMessage<T = unknown> {
  event: string;
  data: T;
  timestamp: string;
}

export interface WebSocketError {
  event: 'error';
  error: {
    code: string;
    message: string;
  };
  timestamp: string;
}

// Типы для межсервисной коммуникации
export interface ServiceMessage<T = unknown> {
  service: 'favotrust' | 'favocoin' | 'mrfavo' | 'favogame';
  action: string;
  data: T;
  metadata: {
    timestamp: string;
    trace_id: string;
    source: string;
  };
}

// Утилитарные типы
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type OptionalKeys<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type AsyncFunction<T = void> = (...args: any[]) => Promise<T>;

export type Nullable<T> = T | null;

// Типы для кэширования
export interface CacheOptions {
  ttl?: number;
  namespace?: string;
  invalidate_on?: string[];
}

export interface CacheEntry<T> {
  data: T;
  expires_at: number;
  metadata?: Record<string, unknown>;
}