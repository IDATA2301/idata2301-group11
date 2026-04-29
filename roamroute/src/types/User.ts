export interface User {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
  user_role: string;
  user_address: string;
  user_country: string;
}

export interface AuthUser {
  id: number;
  userName: string;
  email: string;
  role: string;
  token: string;
  address?: string;
  country?: string;
  user_address?: string;
  user_country?: string;
}