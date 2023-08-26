import _axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const internal_headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const axios = _axios.create()

// Add a request interceptor
axios.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    if (config.url?.startsWith('/')) {
      const headers = {
        ...internal_headers,
        ...config.headers,
      }
      config.headers = headers
    }

    config.baseURL = process.env.PROXY_HOST

    console.log(`Sending request to ${config.url}`)
    return config
  },

  function (error: any) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
