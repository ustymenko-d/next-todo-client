import { baseAuthDto } from '@/dto/auth'
import { AUTH_API_URL } from '@/services/auth.service'
import { IAuthResponse } from '@/types/auth'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IAuthResponse, baseAuthDto>(req, login)
}

const login = (payload: baseAuthDto): Promise<AxiosResponse<IAuthResponse>> =>
	requestHandler<IAuthResponse, baseAuthDto>(
		`${AUTH_API_URL}/signup`,
		'post',
		payload
	)
