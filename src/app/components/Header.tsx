'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
// import useAppStore from '@/store/store'
import ThemeToggle from '@/components/theme/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'

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
			</div>
		</header>
	)
}

export default Header
