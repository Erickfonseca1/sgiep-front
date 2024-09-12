export type AuthProviderType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isGestor: boolean;
  isProfessor: boolean;
  isCidadao: boolean;
  token: string | null;
  login: (token: string, userType: string) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export type AuthType = {
  token: string;
  role: string;
  name: string;
}