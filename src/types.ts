export type RemoteAction = 'register' | 'identify';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  isDevelopment: string;
  allowedDomains: string[];
  created: Date;
  deleted: Date;
}

export interface ErrorMessages {
  property: string;
  messages: string[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  isValid: boolean;
  user?: UserEntity;
  jwt?: string;
  errors: ErrorMessages[];
}
