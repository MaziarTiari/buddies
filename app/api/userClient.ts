import { MutableRefObject, useRef } from "react";
import { IChangePasswordRequestBody, INewUser, IUser, IUserCredentials } from "../models/User";
import { apiRoutes } from "./channels";
import useHttpClient from "./httpClient";

interface ReturnValue {
    getUser: () => Promise<IUser>;
    changePassword: (requestBody: IChangePasswordRequestBody) => Promise<void>;
    updateUser: (user: IUser) => Promise<void>;
}

export function useUserClient(
    token: MutableRefObject<string>, 
    onExpiredToken: () => Promise<string>
) : ReturnValue {
    
    const httpClient = useHttpClient<IUser>({
        config: {baseURL: apiRoutes.user()}, 
        token,
        onExpiredToken
    });

    const getUser = (): Promise<IUser> => httpClient.get<IUser>(undefined);

    const changePassword = (requestBody: IChangePasswordRequestBody): Promise<void> => (
        httpClient.post<void, IChangePasswordRequestBody>(
            apiRoutes.user("change-password"), 
            requestBody,
        )
    );

    const updateUser = (user: IUser): Promise<void> => (
        httpClient.update<void, IUser>(user)
    );

    return ({
        changePassword,
        getUser,
        updateUser,
    })
}
