import { IVerifyingUser, IUser } from '../../models/User/User';
import { getServiceUrl } from '../channels';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { ApiClient } from '../ApiClient';

class UserApi<T> extends ApiClient<T>  {
    
    constructor(config: AxiosRequestConfig) {
        super(config);
        this.VerifyUser = this.VerifyUser.bind(this);
    }
    
    public VerifyUser(verifyingUser: IVerifyingUser) {
        return this.post<IUser, IVerifyingUser>("login/", verifyingUser)
            .then(this.success)
            .catch((error: AxiosError) => {throw error});
    }
}

export const userApi = new UserApi<IUser>({ baseURL: getServiceUrl("Users") });
