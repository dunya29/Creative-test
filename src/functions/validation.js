export function isEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}
export function isPassword(value) {
    return value.length >= 6
}
export function isPhone(value) {
    return  value.match(/^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/) ? true : false
}
export function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
}