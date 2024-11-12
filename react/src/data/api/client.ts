import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

function addCsrfTokenInterceptorOnRequest(request: InternalAxiosRequestConfig) {
  const csrfToken = Cookies.get("csrftoken");
  if (csrfToken) {
    request.headers["X-CSRFToken"] = csrfToken;
  }
  return request;
}

apiClient.interceptors.request.use(addCsrfTokenInterceptorOnRequest);
