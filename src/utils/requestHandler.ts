import { getAxiosInstance } from '@/services/Axios'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AuthService from '@/services/auth/auth.service'
import { TMethods } from '@/types/common'

const buildUrl = (endpoint: string, params?: string): string =>
	params ? `${endpoint}?${params}` : endpoint

const refreshAndRetry = async <R>(
	axiosInstance: AxiosInstance,
	config: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
	try {
		const { data } = await AuthService.refreshToken()
		if (!data.success) throw new Error('Token refresh failed')
		return axiosInstance.request<R>(config)
	} catch (refreshError) {
		console.error('Token refresh failed:', refreshError)
		throw refreshError
	}
}

const sendRequest = async <R>(
	axiosInstance: AxiosInstance,
	config: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
	try {
		return await axiosInstance.request(config)
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			return await refreshAndRetry(axiosInstance, config)
		}
		console.error('API Request Error:', error)
		throw error
	}
}

const requestHandler = async <R, T = undefined>(
	endpoint: string,
	method: TMethods,
	payload?: T,
	params?: string
): Promise<AxiosResponse<R>> => {
	const url = buildUrl(endpoint, params)
	const config: AxiosRequestConfig = {
		url,
		method,
		...(payload && { data: payload }),
	}
	const axiosInstance = await getAxiosInstance()
	return await sendRequest<R>(axiosInstance, config)
}

export default requestHandler
