import requestHandler from '@/utils/requestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'
import { emailDto, passwordDto } from '@/dto/auth'
import { AxiosResponse } from 'axios'

const PasswordApi = {
	forgotPassword: (payload: emailDto): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus, emailDto>(
			`${API_URL}/forgot-password`,
			'post',
			payload
		),

	resetPassword: (
		payload: passwordDto,
		param: string
	): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus, passwordDto>(
			`${API_URL}/reset-password`,
			'patch',
			payload,
			param
		),
}

export default PasswordApi
