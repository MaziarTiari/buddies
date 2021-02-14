import { baseApiUrl } from "./channels";
import { AxiosRequestConfig } from "axios";

export const httpClientBaseConfig: AxiosRequestConfig = {
    responseType: "json",
    withCredentials: true,
    timeout: 30000,
    baseURL: baseApiUrl,
    headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
};