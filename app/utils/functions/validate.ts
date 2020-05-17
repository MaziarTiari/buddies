export const validateEmail = (email: string) => 
    email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) !== undefined;

export const validatePhone = (phone: string) => phone.match(/^(0|\+)[0-9]{10,13}/);