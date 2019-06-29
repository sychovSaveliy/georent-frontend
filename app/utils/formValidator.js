const validateName = name => {
    let regex = /[a-zа-яієїґ'\s]{3,30}$/;

    return regex.test(name);
}
const validateEmail = email => {
    let regex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;

    return regex.test(email);
}
const validatePhone = phone => {
    let regex = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    return regex.test(phone);
}

/*
    Complex Password– only accept a string that has 
    1 uppercase alphabet, 
    1 lowercase alphabet, 
    2 digits and 1 special character.
    Also the minimum allowed length is 4 characters.

*/
const validatePassword = pass => {
    let regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9]).{4,}/;

    return regex.test(pass);
}

export {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
}
