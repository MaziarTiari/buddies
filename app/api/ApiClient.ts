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

    public Get<T>(id: string) {
        return this.get<T>(id).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    public GetAll<T>(url?: string) {
        return this.get<T>(url).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    public Create<T,B=T>(obj: B) {
        return this.post<T,B>("", obj).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }

    public Update<T,B=T>(id: string, newObj: B) {
        return this.put<T,B>(id, newObj).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }
}

export const UserProfileApi = new ApiClient<IUserProfile>(
    {baseURL: getServiceUrl("UserProfiles")}
);

