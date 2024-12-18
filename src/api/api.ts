import axios, { AxiosError, AxiosResponse } from 'axios'
import { error } from 'console';

const api = axios.create({
    baseURL: 'https://localhost:8081/api',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MDg2MTMxZi0xMTQyLTRmMmYtYmQ5OS1lYTliNjA0M2M0MWMiLCJ1bmlxdWVfbmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzM0NTIzOTc4LCJleHAiOjE3MzQ2MTAzNzgsImlhdCI6MTczNDUyMzk3OH0.Uaa7kX56UKlauiK4FnxpLj27butYg9247YPQ7Higgy4'
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

export default api;