export const jwtConstants = {
  access_key: process.env.JWT_SECRET_KEY || 'jwt-secret',
  access_expiry: 60,
  
  refresh_key: process.env.JWT_SECRET_REFRESH_KEY || 'jwt-refresh-secret',
  refresh_expiry: 600,
}