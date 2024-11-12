import { apiClient } from "../client";

export class AuthApiService {
  static async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    return (
      await apiClient.post("/api/login/", {
        username: username,
        password: password,
      })
    ).data;
  }

  static async getUser(): Promise<Usuario | undefined> {
    return (await apiClient.get("/api/auth/me/")).data;
  }

  static async logout() {
    return (await apiClient.get("/api/auth/logout/")).data;
  }
}
