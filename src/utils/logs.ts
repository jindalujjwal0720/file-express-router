import { GLOBAL_OPTIONS } from './router';

export const blue = (text: string) => `\x1b[34m${text}\x1b[0m`;
export const green = (text: string) => `\x1b[32m${text}\x1b[0m`;
export const yellow = (text: string) => `\x1b[33m${text}\x1b[0m`;
export const gray = (text: string) => `\x1b[90m${text}\x1b[0m`;
export const red = (text: string) => `\x1b[31m${text}\x1b[0m`;

class Logger {
  private enabled: boolean;
  private timers: Record<string, number> = {};

  constructor() {
    this.enabled = GLOBAL_OPTIONS?.logger ?? false;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  log(...args: unknown[]) {
    if (this.enabled) {
      const timestamp = Intl.DateTimeFormat('en-US', {
        timeStyle: 'medium',
      }).format(Date.now());
      console.log(blue('[fer]'), gray(`[${timestamp}]`), ...args);
    }
  }

  warn(...args: unknown[]) {
    if (this.enabled) {
      const timestamp = Intl.DateTimeFormat('en-US', {
        timeStyle: 'medium',
      }).format(Date.now());
      console.log(yellow('[fer]'), gray(`[${timestamp}]`), ...args);
    }
  }

  error(...args: unknown[]) {
    if (this.enabled) {
      const timestamp = Intl.DateTimeFormat('en-US', {
        timeStyle: 'medium',
      }).format(Date.now());
      console.error(red('[fer]'), gray(`[${timestamp}]`), ...args);
    }
  }

  startTimer(label: string) {
    if (this.enabled) {
      this.timers[label] = Date.now();
    }
  }

  logTimer(label: string, message: string = '', end = true) {
    if (this.enabled) {
      const timestamp = Intl.DateTimeFormat('en-US', {
        timeStyle: 'medium',
      }).format(Date.now());
      const time = Date.now() - this.timers[label];
      console.log(
        blue('[fer]'),
        gray(`[${timestamp}]`),
        label + (message ? `: ${message}` : ''),
        gray(`(${time}ms)`),
      );
      if (end) {
        delete this.timers[label];
      }
    }
  }
}

export const logger = new Logger();
