import requestHandler from '@/utils/requestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'
import { baseAuthDto } from '@/dto/auth'
import { IAuthResponse, IUserInfo } from '@/types/auth'
import { AxiosResponse } from 'axios'

const AccountApi = {
	signup: (payload: baseAuthDto): Promise<AxiosResponse<IAuthResponse>> =>
		requestHandler<IAuthResponse, baseAuthDto>(
			`${API_URL}/signup`,
			'post',
			payload
		),

	verifyEmail: (param: string): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus, string>(
			`${API_URL}/email-verification`,
			'get',
			undefined,
			param
		),

	login: (payload: baseAuthDto): Promise<AxiosResponse<IAuthResponse>> =>
		requestHandler<IAuthResponse, baseAuthDto>(
			`${API_URL}/login`,
			'post',
			payload
		),

	checkAuth: (): Promise<AxiosResponse<IUserInfo>> =>
		requestHandler<IUserInfo>(`${API_URL}/check`, 'get'),

	logout: (): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus>(`${API_URL}/logout`, 'post'),

	deleteAccount: (): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus>(`${API_URL}/delete-account`, 'delete'),
}

export default AccountApi
