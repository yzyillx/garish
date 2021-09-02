import axios from "axios"

const service = axios.create({
    baseURL: 'localhost:8080/',
    timeout: 5000
})

export {service}