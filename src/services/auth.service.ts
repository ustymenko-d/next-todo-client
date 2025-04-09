import { baseAuthDto, emailDto, passwordDto } from '@/dto/auth'
import { ApiAxios } from './Axios'
import { IAuthResponse, IUserInfo } from '@/types/auth'
import { IResponseStatus } from '@/types/common'
import urlBuilder from '@/utils/urlBuilder'
import { handleServiceRequest } from '@/utils/requestHandler'

export const AUTH_API_URL = '/auth'

const AuthService = {
	signup: (payload: baseAuthDto): Promise<IAuthResponse> =>
		handleServiceRequest(
			() => ApiAxios.post(`${AUTH_API_URL}/signup`, payload),
			'Signup'
		),

	login: (payload: baseAuthDto): Promise<IAuthResponse> =>
		handleServiceRequest(
			() => ApiAxios.post(`${AUTH_API_URL}/login`, payload),
			'Login'
		),

	logout: (): Promise<IResponseStatus> =>
		handleServiceRequest(
			() => ApiAxios.get(`${AUTH_API_URL}/logout`),
			'Logout'
		),

	getAccountInfo: (): Promise<IUserInfo> =>
		handleServiceRequest(
			() => ApiAxios.get(`${AUTH_API_URL}/account-info`),
			'Get account info'
		),

	deleteAccount: (): Promise<IResponseStatus> =>
		handleServiceRequest(
			() => ApiAxios.delete(`${AUTH_API_URL}/delete-account`),
			'Delete account'
		),

	refreshTokens: (): Promise<IResponseStatus> =>
		handleServiceRequest(
			() => ApiAxios.get(`${AUTH_API_URL}/tokens/refresh-tokens`),
			'Refresh tokens'
		),

	verifyEmail: ({
		verificationToken,
	}: {
		verificationToken: string
	}): Promise<IResponseStatus> => {
		const url = urlBuilder(`${AUTH_API_URL}/email-verification`, {
			verificationToken,
		})
		return handleServiceRequest(() => ApiAxios.get(url), 'Verify email')
	},

	forgotPassword: (payload: emailDto): Promise<IResponseStatus> =>
		handleServiceRequest(
			() => ApiAxios.post(`${AUTH_API_URL}/password/forgot-password`, payload),
			'Forgot password'
		),

	resetPassword: ({
		payload,
		resetToken,
	}: {
		payload: passwordDto
		resetToken: string
	}): Promise<IResponseStatus> => {
		const url = urlBuilder(`${AUTH_API_URL}/password/reset-password`, {
			resetToken,
		})
		return handleServiceRequest(
			() => ApiAxios.patch(url, payload),
			'Reset password'
		)
	},

	clearAuthCookies: (): Promise<IResponseStatus> =>
		handleServiceRequest(
			() => ApiAxios.get(`${AUTH_API_URL}/cookies/clear-auth-cookies`),
			'Clear auth cooies'
		),
}

export default AuthService
