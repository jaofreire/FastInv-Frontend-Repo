import axios, { AxiosError, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:8081/api',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MTNjMzM3Mi1mODY5LTQ4MjMtODEyZi05MTI0MTYyOWE2MzUiLCJ1bmlxdWVfbmFtZSI6Ik1haW5BZG1pbiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczNDU1NzQyMiwiZXhwIjoxNzM0NjQzODIyLCJpYXQiOjE3MzQ1NTc0MjJ9.YXAf7JPLpONKZJBGo1ikr1i3URLglg0dpl5uWc3dXT0'
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