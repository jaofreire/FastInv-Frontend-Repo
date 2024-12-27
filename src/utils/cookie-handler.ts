import { Cookies } from 'react-cookie'

const cookies = new Cookies();

const expireDate = new Date();

export const addCookie = (cookieName: string, cookieValue: string) => {
    expireDate.setHours(2);
    cookies.set(cookieName, cookieValue, { path: '/', expires: expireDate });
}

export const deleteCookie = (cookieName: string) => {
    cookies.remove(cookieName);
}

export const getCookie = (cookieName: string): string => {
    return cookies.get(cookieName);
}




