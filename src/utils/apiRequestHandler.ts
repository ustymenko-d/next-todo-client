import { NextRequest, NextResponse } from 'next/server'
import { AxiosResponse } from 'axios'

const apiRequestHandler = async <T, B = undefined>(
	req: NextRequest,
	apiCall: (body: B) => Promise<AxiosResponse<T>>
): Promise<NextResponse> => {
	try {
		const body = await req.json()
		const response = await apiCall(body)
		const { data, status, headers } = response
		const nextResponse = NextResponse.json(data, { status })

		const cookies = headers['set-cookie']
		if (cookies) {
			if (Array.isArray(cookies)) {
				nextResponse.headers.set('set-cookie', cookies.join(', '))
			} else {
				nextResponse.headers.set('set-cookie', cookies)
			}
		}

		return nextResponse
	} catch {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

export default apiRequestHandler
