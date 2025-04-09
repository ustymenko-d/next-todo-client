import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { baseAuthDto } from '@/dto/auth'
import { IAuthResponse } from '@/types/auth'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IAuthResponse, baseAuthDto>(req, login)
}

const login = (payload: baseAuthDto): Promise<AxiosResponse<IAuthResponse>> =>
	requestHandler<IAuthResponse, baseAuthDto>(
		`${AUTH_API_URL}/login`,
		'post',
		payload
	)
