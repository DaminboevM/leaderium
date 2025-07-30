export interface JwtPayload {
    id: number,
    role: string
}

export enum UserRole {
  USER='USER',
  ADMIN='ADMIN'
}