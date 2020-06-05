import { baseApiUrl } from "./channels";
import { AxiosRequestConfig } from "axios";

export const apiConfig: AxiosRequestConfig = {
    responseType: "json",
    withCredentials: true,
    timeout: 30000,
    baseURL: baseApiUrl,
    headers: {
        common: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }
}