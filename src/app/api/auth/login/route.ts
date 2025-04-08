import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/services/auth/auth.service'
import { baseAuthDto } from '@/dto/auth'
import { IAuthResponse } from '@/types/auth'
import requestHandler from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import apiRequestHandler from '@/utils/apiRequestHandler'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IAuthResponse, baseAuthDto>(req, login)
}

const login = (payload: baseAuthDto): Promise<AxiosResponse<IAuthResponse>> =>
	requestHandler<IAuthResponse, baseAuthDto>(
		`${API_URL}/login`,
		'post',
		payload
	)
