export type AuthProviderType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isGestor: boolean;
  isProfessor: boolean;
  isCidadao: boolean;
  token: string | null;
  login: (token: string, userType: string) => void;
  logout: () => void;
}

export type AuthType = {
  token: string;
  userType: string;
}