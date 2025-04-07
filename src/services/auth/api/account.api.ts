import apiRequestHandler from '@/utils/apiRequestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'
import { baseAuthDto } from '@/dto/auth'
import { IAuthResponse, IUserInfo } from '@/types/auth'

const AccountApi = {
	signup: (payload: baseAuthDto): Promise<IAuthResponse> =>
		apiRequestHandler<IAuthResponse, baseAuthDto>(
			`${API_URL}/signup`,
			'post',
			payload
		),

	verifyEmail: (param: string): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus, string>(
			`${API_URL}/email-verification`,
			'get',
			undefined,
			param
		),

	login: (payload: baseAuthDto): Promise<IAuthResponse> =>
		apiRequestHandler<IAuthResponse, baseAuthDto>(
			`${API_URL}/login`,
			'post',
			payload
		),

	checkAuth: (): Promise<IUserInfo> =>
		apiRequestHandler<IUserInfo>(`${API_URL}/check`, 'get'),

	logout: (): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus>(`${API_URL}/logout`, 'post'),

	deleteAccount: (): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus>(`${API_URL}/delete-account`, 'delete'),
}

export default AccountApi
