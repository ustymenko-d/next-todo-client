import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/tokens'

export const redirectTo = (url: string, request: NextRequest) => {
	return NextResponse.redirect(new URL(url, request.url))
}

export async function middleware(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl
	const accessToken = request.cookies.get('access_token')?.value
	const refreshToken = request.cookies.get('refresh_token')?.value
	const resetPasswordToken = searchParams.get('resetToken')
	const isValidAccess = accessToken ? verifyToken(accessToken) : false

	if ((pathname === '/' || pathname.startsWith('/auth')) && isValidAccess)
		return redirectTo('/dashboard', request)

	if (pathname.startsWith('/dashboard') && !accessToken && !refreshToken)
		return redirectTo('/', request)

	if (pathname === '/auth/reset-password' && !resetPasswordToken)
		return redirectTo('/', request)

	return NextResponse.next()
}
