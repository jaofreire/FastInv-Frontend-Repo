import { ApiResponse } from '@/types/api-response-types/api-response';
import { getCookie } from '@/utils/cookie-handler';
import axios, { AxiosError, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7254/api',

    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Resposta recebida: ', response);
        return response;
    },
    (error: AxiosError<ApiResponse<null>>) => {
        console.log('Erro na resposta', error);

        const apiError: ApiResponse<null> = {
            isSuccess: false,
            message: error.response!.data!.message || 'Error inesperado',
            response: null
        }

        return Promise.reject(apiError);
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