import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:8081/api',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MTNjMzM3Mi1mODY5LTQ4MjMtODEyZi05MTI0MTYyOWE2MzUiLCJ1bmlxdWVfbmFtZSI6Ik1haW5BZG1pbiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczNDM4MTUzMiwiZXhwIjoxNzM0NDY3OTMyLCJpYXQiOjE3MzQzODE1MzJ9.IR49RC228OcFqchR3dhVqPiMis7fkJRUi9fMCCU0G_A'
    },
})

export default api;