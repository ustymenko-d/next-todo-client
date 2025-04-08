import { NextRequest, NextResponse } from 'next/server'
import AuthService from '@/services/auth/auth.service'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const response = await AuthService.signup(body)
		const { data, status, headers } = response
		const nextResponse = NextResponse.json(data, {
			status: status,
		})
		const cookies = headers['set-cookie']
		if (cookies) {
			nextResponse.headers.set('set-cookie', cookies.join(', '))
		}
		return nextResponse
	} catch {
		return NextResponse.json(
			{ error: 'Internal server error (signin)' },
			{ status: 500 }
		)
	}
}
