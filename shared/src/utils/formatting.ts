// Path: @favoverse/shared/src/utils/formatting.ts
// Version: 1.2.1
// Made by MrFavo, Clody & Ant with Favor and Love ❤️

import { format, formatDistance, formatRelative } from 'date-fns';

// Форматирование дат
export const dateFormatters = {
  /**
   * Форматирование даты в полный формат
   */
  fullDate: (date: Date | string | number): string => {
    const d = new Date(date);
    return format(d, 'dd.MM.yyyy HH:mm:ss');
  },

  /**
   * Форматирование даты для отображения
   */
  displayDate: (date: Date | string | number): string => {
    const d = new Date(date);
    return format(d, 'dd MMM yyyy');
  },

  /**
   * Относительная дата (например, "2 часа назад")
   */
  relativeDate: (date: Date | string | number, baseDate: Date = new Date()): string => {
    return formatDistance(new Date(date), baseDate, { addSuffix: true });
  },

  /**
   * Умное форматирование даты
   */
  smartDate: (date: Date | string | number): string => {
    const now = new Date();
    const d = new Date(date);
    const diff = now.getTime() - d.getTime();
    
    // Меньше 24 часов - показываем относительное время
    if (diff < 24 * 60 * 60 * 1000) {
      return formatDistance(d, now, { addSuffix: true });
    }
    // До недели - показываем день недели
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return formatRelative(d, now);
    }
    // Иначе полная дата
    return format(d, 'dd.MM.yyyy');
  }
};

// Форматирование чисел
export const numberFormatters = {
  /**
   * Форматирование числа с разделителями
   */
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat().format(num);
  },

  /**
   * Форматирование валюты
   */
  formatCurrency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },

  /**
   * Форматирование процентов
   */
  formatPercent: (value: number, decimals: number = 2): string => {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Форматирование размера файла
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
};

// Форматирование текста
export const textFormatters = {
  /**
   * Обрезка текста с многоточием
   */
  truncate: (text: string, length: number = 100): string => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  },

  /**
   * Форматирование адреса кошелька
   */
  formatWalletAddress: (address: string): string => {
    if (address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  /**
   * Форматирование телефонного номера
   */
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) return phone;
    
    const countryCode = cleaned.slice(0, cleaned.length - 10);
    const areaCode = cleaned.slice(-10, -7);
    const firstPart = cleaned.slice(-7, -4);
    const lastPart = cleaned.slice(-4);
    
    if (countryCode) {
      return `+${countryCode} (${areaCode}) ${firstPart}-${lastPart}`;
    }
    return `(${areaCode}) ${firstPart}-${lastPart}`;
  },

  /**
   * Форматирование email адреса
   */
  formatEmail: (email: string, maskDomain: boolean = false): string => {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    
    const maskedLocal = `${local.slice(0, 2)}${'*'.repeat(local.length - 2)}`;
    if (maskDomain) {
      const [domainName, ext] = domain.split('.');
      const maskedDomain = `${'*'.repeat(domainName.length)}.${ext}`;
      return `${maskedLocal}@${maskedDomain}`;
    }
    return `${maskedLocal}@${domain}`;
  }
};

// Форматирование данных для отображения
export const displayFormatters = {
  /**
   * Форматирование статуса верификации
   */
  verificationStatus: (status: string): string => {
    const statuses: Record<string, string> = {
      pending: 'Pending Verification',
      approved: 'Verified',
      rejected: 'Verification Failed',
      expired: 'Verification Expired'
    };
    return statuses[status] || status;
  },

  /**
   * Форматирование уровня доверия
   */
  trustLevel: (level: number): string => {
    const levels: Record<number, string> = {
      0: 'Basic',
      1: 'Verified',
      2: 'Advanced',
      3: 'Premium'
    };
    return levels[level] || `Level ${level}`;
  }
};