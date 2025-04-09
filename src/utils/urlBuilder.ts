const urlBuilder = (
	endpoint: string,
	params?: Record<string, string>
): string =>
	params ? `${endpoint}?${new URLSearchParams(params).toString()}` : endpoint

export default urlBuilder
