// Path: @favoverse/shared/src/sdk/verification.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import axios, { AxiosInstance } from 'axios';
import { BASE_URLS, HEADERS, ERROR_CODES } from '../constants';
import { 
  Verification,
  CreateVerificationDTO,
  UpdateVerificationDTO,
  VerificationCheckResult,
  ApiResponse,
  ApiError,
  PaginationParams,
  PaginatedResponse
} from '../types';
import { AppError } from '../constants/errors';

export interface VerificationOptions {
  baseUrl?: string;
  apiKey?: string;
  timeout?: number;
  authToken?: string;
}

export class VerificationSDK {
  private client: AxiosInstance;

  constructor(options: VerificationOptions = {}) {
    this.client = axios.create({
      baseURL: options.baseUrl || BASE_URLS.FAVOTRUST,
      timeout: options.timeout || 30000,
      headers: {
        [HEADERS.API_KEY]: options.apiKey || '',
        [HEADERS.CONTENT_TYPE]: 'application/json',
        ...(options.authToken && {
          [HEADERS.AUTHORIZATION]: `Bearer ${options.authToken}`
        })
      }
    });

    this.client.interceptors.response.use(
      response => response,
      this.handleRequestError.bind(this)
    );
  }

  /**
   * Начало процесса верификации
   */
  public async startVerification(data: CreateVerificationDTO): Promise<Verification> {
    try {
      const response = await this.client.post<ApiResponse<Verification>>(
        '/verification/start',
        data
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Подтверждение верификации
   */
  public async confirmVerification(
    verificationId: string,
    code: string
  ): Promise<VerificationCheckResult> {
    try {
      const response = await this.client.post<ApiResponse<VerificationCheckResult>>(
        `/verification/${verificationId}/confirm`,
        { code }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Загрузка документов для верификации
   */
  public async uploadVerificationDocuments(
    verificationId: string,
    files: { [key: string]: File }
  ): Promise<Verification> {
    try {
      const formData = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file);
      });

      const response = await this.client.post<ApiResponse<Verification>>(
        `/verification/${verificationId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Обновление статуса верификации
   */
  public async updateVerification(
    verificationId: string,
    data: UpdateVerificationDTO
  ): Promise<Verification> {
    try {
      const response = await this.client.put<ApiResponse<Verification>>(
        `/verification/${verificationId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Получение верификации по ID
   */
  public async getVerification(verificationId: string): Promise<Verification> {
    try {
      const response = await this.client.get<ApiResponse<Verification>>(
        `/verification/${verificationId}`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Получение списка верификаций пользователя
   */
  public async getUserVerifications(
    userId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Verification>> {
    try {
      const response = await this.client.get<ApiResponse<PaginatedResponse<Verification>>>(
        `/users/${userId}/verifications`,
        { params }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Проверка статуса верификации
   */
  public async checkVerificationStatus(
    verificationId: string
  ): Promise<VerificationCheckResult> {
    try {
      const response = await this.client.get<ApiResponse<VerificationCheckResult>>(
        `/verification/${verificationId}/status`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Получение требований для верификации
   */
  public async getVerificationRequirements(userId: string): Promise<{
    required: string[];
    completed: string[];
    pending: string[];
  }> {
    try {
      const response = await this.client.get<ApiResponse<{
        required: string[];
        completed: string[];
        pending: string[];
      }>>(`/users/${userId}/verification-requirements`);
      return response.data.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  /**
   * Отмена процесса верификации
   */
  public async cancelVerification(verificationId: string): Promise<void> {
    try {
      await this.client.post(`/verification/${verificationId}/cancel`);
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

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
export const createVerificationSDK = (options?: VerificationOptions): VerificationSDK => {
  return new VerificationSDK(options);
};