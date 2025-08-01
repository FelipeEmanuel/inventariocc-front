import axios, { AxiosInstance } from 'axios'

/**
 * @class
 * @category Services
 */
class Axios {

    /**
     * Static method that will return the axios instance
     * @public
     * @static
     * @returns {AxiosInstance}
     */
    public static getInstance(): AxiosInstance {
        if (!this._instance) {
            this._instance = axios.create({
                baseURL: import.meta.env.VITE_REACT_APP_API_GATEWAY,
            })
        }
        return this._instance
    }

    private static _instance: AxiosInstance

}

export default Axios.getInstance()
