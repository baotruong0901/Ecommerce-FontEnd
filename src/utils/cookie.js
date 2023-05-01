import Cookies from 'js-cookie';

// set refreshToken vào cookie với key là 'refreshToken'
export function setCookie(name, value, expires) {
    Cookies.set(name, value, { expires, secure: true, sameSite: 'strict' });
}