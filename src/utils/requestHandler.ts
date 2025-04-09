import { getAxiosInstance } from '@/services/Axios'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TMethods } from '@/types/common'
import AuthService from '@/services/auth.service'
import { NextRequest, NextResponse } from 'next/server'

export const requestHandler = async <R, T = undefined>(
	url: string,
	method: TMethods,
	payload?: T
): Promise<AxiosResponse<R>> => {
	const config: AxiosRequestConfig = {
		url,
		method,
		...(payload && { data: payload }),
	}
	const axiosInstance = await getAxiosInstance()
	return await sendRequest<R>(axiosInstance, config)
}

export const apiRequestHandler = async <T, B = undefined>(
	req: NextRequest,
	apiCall: (body: B) => Promise<AxiosResponse<T>>
): Promise<NextResponse> => {
	try {
		let body: B | undefined = undefined

		if (req.headers.get('content-type')?.includes('application/json')) {
			const text = await req.text()
			if (text) {
				body = JSON.parse(text)
			}
		}

		const response = await apiCall(body as B)
		const { data, status, headers } = response
		const nextResponse = NextResponse.json(data, { status })

		const cookies = headers['set-cookie']
		if (cookies) {
			if (Array.isArray(cookies)) {
				nextResponse.headers.set('set-cookie', cookies.join(', '))
			} else {
				nextResponse.headers.set('set-cookie', cookies)
			}
		}

		return nextResponse
	} catch (error) {
		console.error('API request handler error:', error)

		if (axios.isAxiosError(error)) {
			const status = error.response?.status || 500
			const message = error.response?.data || { error: 'Axios error' }

			return NextResponse.json(message, { status })
		}

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

export const handleServiceRequest = async <T>(
	request: () => Promise<{ data: T }>,
	errorMessage: string
): Promise<T> => {
	try {
		const { data } = await request()
		return data
	} catch (error) {
		console.error(`${errorMessage} error:`, error)
		throw new Error(`${errorMessage} failed`)
	}
}

const refreshAndRetry = async <R>(
	axiosInstance: AxiosInstance,
	config: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
	try {
		const { success } = await AuthService.refreshTokens()
		if (!success) throw new Error('Token refresh failed')
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
