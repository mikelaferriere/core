/**
 * The oAuth2Client here is currently expecting to be a 'google-auth-library' Client
 * until otherwise stated
 */
export interface TokenResponse {
  valid: boolean
  token?: Record<string, any>
  url?: string
  oAuth2Client?: any
}
