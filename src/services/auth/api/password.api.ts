import apiRequestHandler from '@/utils/apiRequestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'
import { emailDto, passwordDto } from '@/dto/auth'

const PasswordApi = {
	forgotPassword: (payload: emailDto): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus, emailDto>(
			`${API_URL}/forgot-password`,
			'post',
			payload
		),

	resetPassword: (
		payload: passwordDto,
		param: string
	): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus, passwordDto>(
			`${API_URL}/reset-password`,
			'patch',
			payload,
			param
		),
}

export default PasswordApi
