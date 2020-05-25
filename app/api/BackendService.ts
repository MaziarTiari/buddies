import { IRequestedAccount } from "../components/SignUpForm/SignUpForm"
import { INewUser, IUser } from "../models/User";
import { Http } from "./Http";
import Axios, { AxiosResponse } from "axios";

export class BackendService<T> {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    createUser(data: T): Promise<T> {
        let response: T;
        return Axios.post<T>(this.url, data)
        .then(res => { return res.data })
        .catch(error => { throw error });
    }

    // getAllUser() {
    //     const response: IUser;
    //     Axios.get(this.url).then(res => )
    // }

}