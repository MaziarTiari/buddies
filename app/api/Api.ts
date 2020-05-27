import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

/**
 * ES6 Axios Class.
 *
 * @class Api
 * @extends {Axios}
 * @example
 * class UserApi extends Api {
 *   public constructor (config) {
 *     super(config);
 *
 *     this.login=this.login.bind(this);
 *   }
 *
 *   public login (user: User) {
 *     return this.api.post<string, User, AxiosResponse<User>>("https://www.domain/login", {name: user.name, pass: user.pass})
 *        .then((res: AxiosResponse<string>) => res.data);
 *   }
 * }
 */
type ServerError = { status: number, description: string }

export interface ApiResponse<T> {
    data?: T;
    error?: ServerError;
}

export class ApiResponse<T> {
    data?: T;
    error?: ServerError;
}

export class Api {
    [x:string]: any;
    /**
     * Creates an instance of Api.
     *
     * @param {import("axios").AxiosRequestConfig} [config] - axios configuration.
     * @memberof Api
     */
    public constructor (config: AxiosRequestConfig) {
        this.api = axios.create(config);

        this.getUri = this.getUri.bind(this);
        this.request = this.request.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.head = this.head.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
    }

    /**
     * Get Uri
     *
     * @param {import("axios").AxiosRequestConfig} [config]
     * @returns {string}
     * @memberof Api
     */
    protected getUri (config?: AxiosRequestConfig): string {
        return this.api.api.getUri(config);
    }

    /**
     * Generic request.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP axios response payload.
     * @memberof Api
     *
     * @example
     * api.request({
     *   method: "GET|POST|DELETE|PUT|PATCH"
     *   baseUrl: "http://www.domain.com",
     *   url: "/api/v1/users",
     *   headers: {
     *     "Content-Type": "application/json"
     *  }
     * }).then((response: AxiosResponse<User>) => response.data)
     *
     */
    protected request<T, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R> {
        return this.api.api.request(config);
    }

    /**
     * HTTP GET method, used to fetch data `statusCode`: 200.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    protected get<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    /**
     * HTTP DELETE method, `statusCode`: 204 No Content.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    protected delete<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.delete(url, config);
    }

    /**
     * HTTP HEAD method.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    protected head<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.head(url, config);
    }

    /**
     * HTTP POST method `statusCode`: 201 Created.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    protected post<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this.api.post(url, data, config);
    }

    /**
     * HTTP PUT method.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    protected put<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this.api.put(url, data, config);
    }

   /**
     * HTTP PATCH method.
     *
     * @access protected
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: (optional) expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    protected patch<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this.api.patch(url, data, config);
    }

    /**
     *
     * @template T - type.
     * @param {import("axios").AxiosResponse<T>} response - axios response.
     * @returns {T} - expected object.
     * @memberof Api
     */
    protected success<T> (response: AxiosResponse<T>): T {
        return response.data;
    }

    protected error(e: any): ServerError {
        let error: ServerError = {status: 0, description: ""};
        if(e.response.status) {
            error.status = (e as AxiosError).response!.status;
        }
        if((e as AxiosError).response?.statusText) {
            error.description = (e as AxiosError).response?.statusText!;
        }
        if(error.description === "") {
            error.description = e;
        }
        return error;
    }
}