import axios from "axios";

const api = axios.create({
    baseURL: 'https://arabic-quiz-backend.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default api;