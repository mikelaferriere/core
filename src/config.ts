export const getHost = (): string =>
  process.env.PROXY_HOST ?? 'http://localhost'
