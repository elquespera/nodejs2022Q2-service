export const jwtSecrets = {
  access: process.env.JWT_SECRET_KEY || 'jwt-secret',
  refresh: process.env.JWT_SECRET_REFRESH_KEY || 'jwt-refresh-secret',
}