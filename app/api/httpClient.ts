import { MutableRefObject } from 'react'
import { AxiosRequestConfig, AxiosError } from "axios";
import { UNAUTHORIZED } from 'http-status-codes';
import jwtDecode from 'jwt-decode';
import { JWT } from '../models/JWT';
import moment from 'moment';
import { TypedAxiosInstance } from './TypedAxiosInstance';
import { httpClientBaseConfig } from './Api.config';
import { Utilities } from '../utils/AppUtilities';

interface HttpClientProps {
    config: AxiosRequestConfig; 
    token: MutableRefObject<string>;
    onExpiredToken: () => Promise<void>;
}

export default function useHttpClient<T>(props: HttpClientProps) {
    const apiClient = new TypedAxiosInstance<T>(httpClientBaseConfig, props.config);

    const isInvalidJWT = (jwt: JWT) => 
        jwt?.nameid === undefined ||
        jwt?.exp === undefined ||
        Utilities.isUnixTimeExpired(jwt.exp);
    ;

    const getRequestConfig = () => ({
        headers: { Authorization: "Bearer " + props.token.current,
    }});

    /**
     * 
     * @param {string} id - the identifiert could also be an email
     * @template T - Type of expected response
     * @example
     * get<User>(user.id).then((res) => this.setUser(res))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === NOT_FOUND)
     *         return setResponceError("User not found");
     *     else 
     *         return setResponceError(genericResponceError);
     * })
     */
    function get<T>(id?: string): Promise<T> {
        return (
            apiClient.get<T>(id, getRequestConfig())
                .then(apiClient.success)
                .catch((error: AxiosError) => 
                    handleError<T>(error, get, id).catch(error => { throw error })
                )
        );
    }

        /**
     * @template T - Type of expected response
     * @example
     * getMany<User[]>().then((res) => this.setUser(res))
     * .catch((err: AxiosError) => setResponceError(genericResponceError);
     */
    function getMany<T>(url?: string): Promise<T> {
        return (
            apiClient.get<T>(url, getRequestConfig())
                .then(apiClient.success)
                .catch((error: AxiosError) => 
                    handleError<T>(error, getMany, url).catch(error => { throw error })
                )
        );
    }

    /**
     * 
     * @param obj - the object you want to create
     * @template T - `Type` of expected response
     * @template B - `Type` of request body `(optional)`
     * @example
     * create<User, NewUser>(newUser).then((res) => this.setUser(res))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === CONFLICT)
     *         return setResponceError("User already exists");
     *     else     
     *         return setResponceError(genericResponceError);
     * })
     */
    function create<T, B = T>(obj: B): Promise<T> {
        return (
            apiClient.post<T, B>("", obj, getRequestConfig())
                .then(apiClient.success)
                .catch((error: AxiosError) => 
                    handleError<T>(error, create, obj).catch(error => { throw error })
                )
        );
    }

    /**
     * 
     * @param obj - the object you want to create
     * @template T - `Type` of expected response
     * @template B - `Type` of request body `(optional)`
     * @example
     * post<string, UserCredentials>(useCred).then((res) => this.setToken(res))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === UNAUTHORIZED)
     *         return setResponceError("Wrong Password");
     *     else     
     *         return setResponceError(genericResponceError);
     * })
     */
    function post<T, B = T>(url: string, obj: B): Promise<T> {
        return (
            apiClient.post<T, B>(url, obj, getRequestConfig())
                .then(apiClient.success)
                .catch((error: AxiosError) => 
                    handleError<T>(error, post, url).catch(error => { throw error })
                )
        );
    }

        /**
     * 
     * @param obj - the object you want to create
     * @template T - `Type` of expected response
     * @template B - `Type` of request body `(optional)`
     * @example
     * update<number, User>(user.id, user).then(() => setStatus("Success"))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === NOT_FOUND)
     *         return setResponceError("User not found");
     *     else 
     *         return setResponceError(genericResponceError);
     * })
     */
    function update<T, B extends { id: string }>(newObj: B): Promise<T> {
        return (
            apiClient.put<T, B>(newObj.id, newObj, getRequestConfig())
                .then(apiClient.success)
                .catch((error: AxiosError) => 
                    handleError<T>(error, update, newObj).catch(error => { throw error })
                )
        );
    }

    async function handleError<C>(
        error: AxiosError, 
        clb: (...args: any) => Promise<C>, 
        ...args: any[]
    ): Promise<C> {
        const jwt = jwtDecode<JWT>(props.token.current);
        if (error.response?.status === UNAUTHORIZED && isInvalidJWT(jwt) ) {
            try {
                await props.onExpiredToken();
                try {
                    const res = await clb(...args);
                    return res;
                } catch (error) {
                    throw error;
                };
            } catch (error) {
                throw error
            }
        } else {
            throw error;
        }
    }

    return {
        get,
        getMany,
        post,
        update,
        create,
    };
}
