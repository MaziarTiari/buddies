import { Api } from "./Api";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { IUserProfile } from "../models/User/UserProfile";
import { getServiceUrl } from "./channels";

export class ApiClient<T> extends Api<T> {
    constructor(config: AxiosRequestConfig) {
        super(config);
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.GetAll = this.GetAll.bind(this);
    }

    /**
     * 
     * @param {string} id - the identifiert could also be an email
     * @template T - Type of expected response
     * @example
     * api.Get<User>(user.id).then((res) => this.setUser(res))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === NOT_FOUND)
     *         return setResponceError("User not found");
     *     else 
     *         return setResponceError(genericResponceError);
     * })
     */
    public Get<T>(id: string) {
        return this.get<T>(id).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    /**
     * @template T - Type of expected response
     * @example
     * api.GetAll<User[]>().then((res) => this.setUser(res))
     * .catch((err: AxiosError) => setResponceError(genericResponceError);
     */
    public GetAll<T>(url?: string) {
        return this.get<T>(url).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    /**
     * 
     * @param obj - the object you want to create
     * @template T - `Type` of expected response
     * @template B - `Type` of request body `(optional)`
     * @example
     * api.Create<User, NewUser>(newUser).then((res) => this.setUser(res))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === CONFLICT)
     *         return setResponceError("User already exists");
     *     else     
     *         return setResponceError(genericResponceError);
     * })
     */
    public Create<T,B=T>(obj: B) {
        return this.post<T,B>("", obj).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    /**
     * 
     * @param obj - the object you want to create
     * @template T - `Type` of expected response
     * @template B - `Type` of request body `(optional)`
     * @example
     * api.Update<number, User>(user.id, user).then(() => setStatus("Success"))
     * .catch((err: AxiosError) => {
     *     if(err.responce.status === NOT_FOUND)
     *         return setResponceError("User not found");
     *     else 
     *         return setResponceError(genericResponceError);
     * })
     */
    public Update<T,B=T>(id: string, newObj: B) {
        return this.put<T,B>(id, newObj).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }
}

export const UserProfileApi = new ApiClient<IUserProfile>(
    {baseURL: getServiceUrl("UserProfiles")}
);

