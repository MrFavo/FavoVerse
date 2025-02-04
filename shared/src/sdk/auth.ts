// Path: @favoverse/shared/src/sdk/auth.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import axios, { AxiosInstance } from 'axios';
import { BASE_URLS, HEADERS, ERROR_CODES } from '../constants';
import { User, ApiResponse, ApiError, CreateUserDTO } from '../types';
import { AppError } from '../constants/errors';

export interface AuthOptions {
  baseUrl?: string;
  apiKey?: string;
  timeout?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
  expires_in: number;
}

export class AuthSDK {
  private client: AxiosInstance;
  private tokens: {
    access?: string;
    refresh?: string;
  } = {};

  constructor(options: AuthOptions = {}) {
    this.client = axios.create({
      baseURL: options.baseUrl || BASE_URLS.FAVOTRUST,
      timeout: options.timeout || 30000,
      headers: {
        [HEADERS.API_KEY]: options.apiKey || '',
        [HEADERS.CONTENT_TYPE]: 'application/json'
      }
    });

    // Интерцептор для обработки ответов
    this.client.interceptors.response.use(
      response => response,
      this.handleRequestError.bind(this)
    );

    // Интерцептор для добавления токена
    this.client.interceptors.request.use(
      config => {
        if (this.tokens.access) {
          config.headers[HEADERS.AUTHORIZATION] = `Bearer ${this.tokens.access}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  /**
   * Telegram аутентификация
   */
  public async telegramAuth(data: { telegram_id: number; username: string }): Promise<AuthResponse> {
    try {
      const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/telegram', data);
      this.setTokens(response.data.data.token, response.data.data.refresh_token);
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Создание нового пользователя
   */
  public async createUser(data: CreateUserDTO): Promise<User> {
    try {
      const response = await this.client.post<ApiResponse<User>>('/users', data);
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Обновление токена
   */
  public async refreshToken(): Promise<AuthResponse> {
    if (!this.tokens.refresh) {
      throw new AppError(ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN);
    }

    try {
      const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/refresh', {
        refresh_token: this.tokens.refresh
      });
      
      this.setTokens(response.data.data.token, response.data.data.refresh_token);
      return response.data.data;
    } catch (error) {
      this.clearTokens();
      throw this.handleRequestError(error);
    }
  }

  /**
   * Выход из системы
   */
  public async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
      this.clearTokens();
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Получение текущего пользователя
   */
  public async getCurrentUser(): Promise<User> {
    try {
      const response = await this.client.get<ApiResponse<User>>('/users/me');
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Установка токенов
   */
  private setTokens(accessToken: string, refreshToken: string): void {
    this.tokens = {
      access: accessToken,
      refresh: refreshToken
    };
  }

  /**
   * Очистка токенов
   */
  private clearTokens(): void {
    this.tokens = {};
  }

  /**
   * Обработка ошибок запросов
   */
  private handleRequestError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ApiError;
      throw new AppError(
        errorData.error.code,
        errorData.error.message,
        errorData.error.details
      );
    }

    throw new AppError(
      ERROR_CODES.SYSTEM.INTERNAL_ERROR,
      'An unexpected error occurred'
    );
  }
}

// Создание инстанса SDK с настройками по умолчанию
export const createAuthSDK = (options?: AuthOptions): AuthSDK => {
  return new AuthSDK(options);
};