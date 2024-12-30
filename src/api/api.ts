import { getCookie } from '@/utils/cookie-handler';
import axios, { AxiosError, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:8081/api',

    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Resposta recebida: ', response);
        return response;
    },
    (error: AxiosError) => {
        console.log('Erro na resposta', error);

        return Promise.reject(error);
    } 
)

api.interceptors.request.use((config) => {
    const tokenCookie = getCookie('token');

    if (tokenCookie && config.headers) {
        config.headers['Authorization'] = `Bearer ${tokenCookie}`;
    }

    return config;
});

export default api;