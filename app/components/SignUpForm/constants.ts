export interface IForm {
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
}

export const INITIAL_FORM: IForm = {
    email: "",
    phone: "",
    password: "",
    repeatPassword: ""
}

export enum FormKey {
    email = "email",
    phone = "phone",
    password = "password",
    repeatPassword = "repeatPassword"
}

export interface IShowErrowMessage {
    email: boolean;
    phone: boolean;
    password: boolean;
}

export interface IFormErrorSatus extends IShowErrowMessage{
    repeatPassword: boolean;
}

export const INITIAL_FORM_STATUS: IFormErrorSatus = {
    email: false,
    phone: false,
    password: false,
    repeatPassword: false,
}

export const INITIAL_SHOW_ERROR_MSG: IShowErrowMessage = {
    email: false,
    phone: false,
    password: false,
}