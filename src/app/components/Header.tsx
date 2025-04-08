'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
// import useAppStore from '@/store/store'
import ThemeToggle from '@/components/theme/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/button'
// import { ApiAxios } from '@/services/Axios'
import AuthService from '@/services/auth/auth.service'

const Header = () => {
	const pathname = usePathname()
	// const isAuthorized = useAppStore((state) => state.isAuthorized)

	return (
		<header className='border-b border-dashed'>
			<div className='container flex flex-wrap items-center px-2 mx-auto border-dashed lg:px-4 sm:border-x min-h-14 gap-x-2'>
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
				{/* {isAuthorized && <AccountActions />} */}
				<Button
					onClick={async () => {
						const res = await AuthService.login({
							email: 'yllaciarbegla@gmail.com',
							password: 'Secure123',
							rememberMe: true,
						})
						const { username } = res
						console.log(username)
					}}>
					test login
				</Button>
			</div>
		</header>
	)
}

export default Header
