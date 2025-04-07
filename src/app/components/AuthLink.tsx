'use client'

import { buttonVariants } from '@/components/ui/button'
import useAppStore from '@/store/store'
import Link from 'next/link'

const AuthLink = ({
	variant,
	type,
}: {
	variant: 'default' | 'outline'
	type: 'signup' | 'login'
}) => {
	const setAuthFormType = useAppStore((state) => state.setAuthFormType)

	return (
		<Link
			className={buttonVariants({ variant })}
			href='/auth'
			onClick={() => {
				setAuthFormType(type)
			}}>
			{type === 'signup' ? 'Sign up' : 'Log in'}
		</Link>
	)
}

export default AuthLink
