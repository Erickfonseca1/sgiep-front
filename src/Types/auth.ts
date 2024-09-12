export type AuthProviderType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isGestor: boolean;
  isProfessor: boolean;
  isCidadao: boolean;
  token: string | null;
  name: string | null;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  loadingAuthState: boolean;
  setLoadingAuthState: (loading: boolean) => void;
}

export type AuthType = {
  token: string;
  role: string;
  name: string;
}