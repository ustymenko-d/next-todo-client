'use client'

import ThemeToggle from '@/components/theme/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/button'
import AuthService from '@/services/auth.service'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Actions = () => {
	const pathname = usePathname()
	const isHomePage = pathname === '/' || pathname.startsWith('/auth')

	if (isHomePage)
		return (
			<>
				{pathname.startsWith('/auth') && (
					<Link
						className={buttonVariants({
							variant: 'outline',
							size: 'icon',
						})}
						href='/'
						replace>
						<ChevronLeft />
					</Link>
				)}
				<ThemeToggle />
			</>
		)

	return (
		<>
			<ThemeToggle />
			<Button
				onClick={async () => {
					await AuthService.clearAuthCookies()
				}}>
				clear cookies
			</Button>
			<Button
				onClick={async () => {
					await AuthService.logout()
				}}>
				logout
			</Button>
		</>
	)
}

export default Actions
