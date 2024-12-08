export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type AuthResult = {
  error?: string;
  success?: boolean;
  user?: AuthUser;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  name: string;
};

export type Session = {
  user: AuthUser;
  expires: Date;
};

export type JWTPayload = {
  userId: string;
  sessionId: string;
};