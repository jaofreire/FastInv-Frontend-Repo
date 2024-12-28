import axios, { AxiosError, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:8081/api',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MTNjMzM3Mi1mODY5LTQ4MjMtODEyZi05MTI0MTYyOWE2MzUiLCJ1bmlxdWVfbmFtZSI6Ik1haW5BZG1pbiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczNTM5Njk5OCwiZXhwIjoxNzM1NDgzMzk4LCJpYXQiOjE3MzUzOTY5OTh9.P06dObWHArHNAdkBemin4T3Cwd35z2D-XFYfaK_mlUc'
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