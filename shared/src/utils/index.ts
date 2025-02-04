// Path: @favoverse/shared/src/utils/index.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

export * from './validation';
export * from './formatting';

// Утилиты для работы с объектами
export const objectUtils = {
  /**
   * Очистка объекта от пустых значений
   */
  clean: <T extends Record<string, any>>(obj: T): Partial<T> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  },

  /**
   * Глубокое клонирование объекта
   */
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Рекурсивное сравнение объектов
   */
  deepEqual: (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    if (obj1 === null || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => objectUtils.deepEqual(obj1[key], obj2[key]));
  }
};

// Утилиты для работы с массивами
export const arrayUtils = {
  /**
   * Удаление дубликатов из массива
   */
  unique: <T>(arr: T[]): T[] => [...new Set(arr)],

  /**
   * Группировка массива по ключу
   */
  groupBy: <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  },

  /**
   * Разбивка массива на чанки
   */
  chunk: <T>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
};

// Утилиты для работы с промисами
export const promiseUtils = {
  /**
   * Таймаут для промиса
   */
  timeout: <T>(promise: Promise<T>, ms: number): Promise<T> => {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeoutPromise]);
  },

  /**
   * Повтор промиса при ошибке
   */
  retry: async <T>(
    fn: () => Promise<T>,
    attempts: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (attempts <= 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return promiseUtils.retry(fn, attempts - 1, delay * 2);
    }
  }
};

// Утилиты для работы с типами
export const typeUtils = {
  /**
   * Проверка типа значения
   */
  isType: {
    string: (value: unknown): value is string => typeof value === 'string',
    number: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),
    boolean: (value: unknown): value is boolean => typeof value === 'boolean',
    array: (value: unknown): value is unknown[] => Array.isArray(value),
    object: (value: unknown): value is object =>
      value !== null && typeof value === 'object' && !Array.isArray(value)
  }
};

// Утилиты для логирования
export const logUtils = {
  /**
   * Создание форматированного лога
   */
  createLog: (
    level: 'info' | 'warn' | 'error',
    message: string,
    data?: Record<string, unknown>
  ): string => {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data
    });
  }
};