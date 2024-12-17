import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7254/api',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MDg2MTMxZi0xMTQyLTRmMmYtYmQ5OS1lYTliNjA0M2M0MWMiLCJ1bmlxdWVfbmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzM0NDM1MjcyLCJleHAiOjE3MzQ1MjE2NzIsImlhdCI6MTczNDQzNTI3Mn0.bSWDmncHg5m4BKO9D49VpTz9EeQe4eqQRm-iIFz73y0'
    },
})

export default api;