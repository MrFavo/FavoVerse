// Path: @favoverse/shared/src/sdk/index.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import { AuthSDK, createAuthSDK, AuthOptions } from './auth';
import { VerificationSDK, createVerificationSDK, VerificationOptions } from './verification';

// Общие настройки для всех SDK
export interface SDKOptions {
  baseUrl?: string;
  apiKey?: string;
  timeout?: number;
  authToken?: string;
}

// Класс для управления всеми SDK
export class FavoSDK {
  public readonly auth: AuthSDK;
  public readonly verification: VerificationSDK;

  constructor(options: SDKOptions = {}) {
    // Инициализация AuthSDK
    this.auth = createAuthSDK({
      baseUrl: options.baseUrl,
      apiKey: options.apiKey,
      timeout: options.timeout
    });

    // Инициализация VerificationSDK
    this.verification = createVerificationSDK({
      baseUrl: options.baseUrl,
      apiKey: options.apiKey,
      timeout: options.timeout,
      authToken: options.authToken
    });
  }

  // Метод для обновления токена во всех SDK
  public updateAuthToken(token: string): void {
    // Пересоздаем VerificationSDK с новым токеном
    this.verification = createVerificationSDK({
      baseUrl: this.verification['client'].defaults.baseURL,
      apiKey: this.verification['client'].defaults.headers[HEADERS.API_KEY],
      timeout: this.verification['client'].defaults.timeout,
      authToken: token
    });
  }
}

// Функция для создания экземпляра FavoSDK
export const createFavoSDK = (options?: SDKOptions): FavoSDK => {
  return new FavoSDK(options);
};

// Экспорт всех типов и классов
export * from './auth';
export * from './verification';

// Пример использования:
/*
const sdk = createFavoSDK({
  baseUrl: 'https://api.favotrust.com',
  apiKey: 'your-api-key'
});

// Использование auth SDK
const authResponse = await sdk.auth.telegramAuth({
  telegram_id: 123456789,
  username: 'example'
});

// Автоматическое обновление токена во всех SDK
sdk.updateAuthToken(authResponse.token);

// Использование verification SDK
const verification = await sdk.verification.startVerification({
  type: 'email',
  data: {
    email: 'user@example.com'
  }
});
*/