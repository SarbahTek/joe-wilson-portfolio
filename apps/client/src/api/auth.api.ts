import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type {
  AuthTokens,
  ForgotPasswordInput,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  RegisterWithProfileInput,
  ResetPasswordInput,
  UpdateMeInput,
  User,
} from "@/types/auth.types";

export const authApi = {
  register(input: RegisterInput) {
    return apiClient.post<RegisterResponse | void>("/auth/register", input).then(unwrapData);
  },

  /** Register with full profile, then auto-login */
  async registerWithProfile(input: RegisterWithProfileInput): Promise<LoginResponse> {
    const { email, password, firstName, lastName } = input;
    await apiClient.post("/auth/register", { email, password, firstName, lastName });
    const auth = await apiClient
      .post<LoginResponse>("/auth/login", { email, password })
      .then(unwrapData);
    return auth;
  },

  login(input: LoginInput) {
    return apiClient.post<LoginResponse>("/auth/login", input).then(unwrapData);
  },

  refresh(refreshToken: string) {
    return apiClient.post<AuthTokens & { user?: User }>("/auth/refresh", { refreshToken }).then(unwrapData);
  },

  logout() {
    return apiClient.post<void>("/auth/logout").then(unwrapData);
  },

  forgotPassword(input: ForgotPasswordInput) {
    return apiClient.post<{ message?: string }>("/auth/forgot-password", input).then(unwrapData);
  },

  resetPassword(input: ResetPasswordInput) {
    return apiClient.post<{ message?: string }>("/auth/reset-password", input).then(unwrapData);
  },

  me() {
    return apiClient.get<User>("/auth/me").then(unwrapData);
  },

  updateMe(input: UpdateMeInput) {
    return apiClient.patch<User>("/auth/me", input).then(unwrapData);
  },
};
