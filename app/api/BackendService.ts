import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { Api, ApiResponse } from "./ApiClient";

interface Config extends AxiosRequestConfig {
    baseURL: string;
}

export interface BackendService<T> extends Api{
    Create<T,B>(data: B, url?: string, config?: AxiosRequestConfig) : Promise<ApiResponse<T>>;
    Get<T>(url?: string, config?: AxiosRequestConfig) : Promise<ApiResponse<T>>;
    Delete(url: string, config?: AxiosRequestConfig) : Promise<ApiResponse<number>>;
    Update<T,B = T>(data: B, url: string, config?: AxiosRequestConfig) : Promise<ApiResponse<T>>;
}

export class BackendService<T> extends Api{

    constructor(config: Config){
        super(config)

        this.Get = this.Get.bind(this);
        this.Create = this.Create.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
    }
    
    /**
     * @template T - `TYPE: expected object`
     * @template B - `BODY: Request Body`
     * @param url - `Resource (eg. /Users)`
     * @param data `Request body`
     * @param config
     */
    async Create<T,B>(data: B, url: string = "/", config?: AxiosRequestConfig) 
            : Promise<ApiResponse<T>> 
    {
        let response = new ApiResponse<T>();
        try { 
            const res = await this.post<T,B>(url , data, config);
            response.data = this.success(res);
        } catch(e) {
            response.error = this.error(e);
        }
        return response;
    }

    /**
     * @template T - `TYPE: expected object`
     * @param url - `Resource (eg. /Users) has defaull("/")`
     * @param config
     */
    async Get(url: string = "/", config?: AxiosRequestConfig) 
            : Promise<ApiResponse<T>> 
    {
        let response = new ApiResponse<T>();
        try {
            const res = await this.get<T>(url, config);
            response.data = this.success(res);
        } catch(e) {
            response.error =  this.error(e);
        }
        return response;
    }

    async Delete(url: string, config?: AxiosRequestConfig) 
            : Promise<ApiResponse<number>> 
    {
        let response = new ApiResponse<number>();
        try {
            const res = await this.delete<number>(url, config);
            response.data = this.success(res);
        } catch(e) {
            response.error =  this.error(e);
        }
        return response;
    }

    async Update<T,B = T>(data: B, url: string, config?: AxiosRequestConfig)
            : Promise<ApiResponse<T>>
    {
        let response = new ApiResponse<T>();
        try { 
            const res = await this.put<T,B>(url , data, config);
            response.data = this.success(res);
        } catch(e) {
            response.error = this.error(e);
        }
        return response;
    }
}