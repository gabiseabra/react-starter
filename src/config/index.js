export const SSR = process.env.SSR !== 'false'

export const API_URL = process.env.API_URL || 'http://localhost:4000'

export const WS_URL = WS_URL || `${API_URL.replace(/^http/, 'ws')}/socket`

export const APOLLO_ENGINE_URL =
  process.env.APOLLO_ENGINE_URL || `${API_URL}/graphql_api`

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID

export const ACCOUNT_KIT_APP_SECRET = process.env.ACCOUNT_KIT_APP_SECRET