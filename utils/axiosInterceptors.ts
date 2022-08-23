import axios, {AxiosRequestConfig} from "axios";

const options = {
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 15000,
    withCredentials: true
}

const api = axios.create(options)

api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!.Authorization = `bearer ${localStorage.getItem('accessToken')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const origin = error.config
    const accessToken = localStorage.getItem('accessToken');
    if ( error.response.status === 401 && origin && !origin._isRetry && accessToken) {
        origin._isRetry = true
        try {
            const response = await axios.get('/users/refreshToken', {
                ...options,
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }

            })
            localStorage.setItem('accessToken', response.data.accessToken)
            return api.request(origin)
        } catch (e) {
            throw e;
        }
    }
    throw error
})
export default api