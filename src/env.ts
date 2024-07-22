export const IS_TEST = process.env.RN_PUBLIC_ENV === 'test'
export const IS_DEV = __DEV__
export const IS_PROD = !IS_DEV
export const LOG_DEBUG = process.env.RN_PUBLIC_LOG_DEBUG || ''
export const LOG_LEVEL = (process.env.RN_PUBLIC_LOG_LEVEL || 'info') as
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
