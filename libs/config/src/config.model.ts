export interface BackendConfig {
  // mongo
  dbUrl: string;

  // redis
  host: string;
  port: number;
  username?: string;
  password?: string;
}
