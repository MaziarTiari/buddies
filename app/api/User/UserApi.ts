import { IVerifyingUser, IUser } from '../../models/User';
import { getServiceUrl } from '../channels';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { ApiClient } from '../ApiClient';

class UserApi extends ApiClient<IUser>  {

    constructor(config: AxiosRequestConfig) {
        super(config);
        this.VerifyUser = this.VerifyUser.bind(this);
    }

    public VerifyUser(verifyingUser: IVerifyingUser) {
        return this.post<IUser, IVerifyingUser>("login/", verifyingUser)
            .then(this.success)
            .catch((error: AxiosError) => { throw error });
    }
}

export default UserApi;
