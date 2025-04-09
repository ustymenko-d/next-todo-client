import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { IResponseStatus } from '@/types/common'
import { emailDto } from '@/dto/auth'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IResponseStatus, emailDto>(req, forgotPassword)
}

const forgotPassword = (
	payload: emailDto
): Promise<AxiosResponse<IResponseStatus>> =>
	requestHandler<IResponseStatus, emailDto>(
		`${AUTH_API_URL}/password/forgot-password`,
		'patch',
		payload
	)
