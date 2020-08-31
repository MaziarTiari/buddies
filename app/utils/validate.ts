export const isEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase().trim());
}

export const isPhoneNumber = (phone: string) => (/^(0|\+)[ 0-9]{10,}/).test(phone);

export function isNumeric(value: string) {
    return /^-{0,1}\d+$/.test(value);
}