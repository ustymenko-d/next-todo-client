import axios, { AxiosInstance } from 'axios'

const baseConfig = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
	timeout: 5000,
}

export const Axios: AxiosInstance = axios.create({
	...baseConfig,
})

export const ApiAxios: AxiosInstance = axios.create({
	...baseConfig,
	baseURL: '/api',
})

export const getAxiosInstance = async (): Promise<AxiosInstance> =>
	typeof window === 'undefined'
		? await getServerAxios()
		: Promise.resolve(Axios)

export const getServerAxios = async () => {
	const { cookies } = await import('next/headers')
	const instance = axios.create(baseConfig)

	instance.interceptors.request.use(async (config) => {
		const cookieStore = await cookies()
		const cookieHeader = cookieStore.toString()

		if (cookieHeader) {
			config.headers.set('Cookie', cookieHeader)
		}

		return config
	})

	return instance
}
