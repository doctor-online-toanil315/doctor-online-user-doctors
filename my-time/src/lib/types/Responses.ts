export interface AuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
  upgraded: boolean;
}
