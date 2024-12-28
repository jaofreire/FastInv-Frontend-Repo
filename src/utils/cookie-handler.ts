import { Cookies } from 'react-cookie';

//Futuramente definir que informações do cookie não sejam acessadas via javascript, apenas via json para enviou de requisições
const cookies = new Cookies();

const expireDate = new Date();

export const addCookie = (cookieName: string, cookieValue: string) => {
    expireDate.setHours(2);
    //Descobrir o porque expires não funciona
    cookies.set(cookieName, cookieValue, { path: '/', sameSite: 'strict', domain: 'localhost'});
}

export const deleteCookie = (cookieName: string) => {
    cookies.remove(cookieName);
}

export const getCookie = (cookieName: string): string => {
    return cookies.get(cookieName);
}




