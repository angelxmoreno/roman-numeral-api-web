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
