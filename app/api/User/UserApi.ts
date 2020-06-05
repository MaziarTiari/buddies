import React from 'react'
import { View, Text } from 'react-native'
import { ApiClient } from '../ApiClient';
import { IVerifyingUser, IUser, INewUser } from '../../models/User/User';
import { getServiceUrl } from '../channels';
import { UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import { Api } from '../Api';
import { AxiosRequestConfig, AxiosError } from 'axios';

const VerifyingUserApi = new ApiClient<IVerifyingUser>(
    { baseURL: getServiceUrl("Users/login") }
);

class UserApi<T> extends Api<T>  {
    
    constructor(config: AxiosRequestConfig) {
        super(config);
        this.VerifyUser = this.VerifyUser.bind(this);
    }
    
    public VerifyUser(verifyingUser: IVerifyingUser) {
        return this.post<IUser, IVerifyingUser>("login/", verifyingUser).then(this.success)
            .catch((error: AxiosError) => {throw error});
    }
}

export const userApi = new UserApi<IUser>({ baseURL: getServiceUrl("Users") });
