import Link from 'next/link'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NotFound = () => {
	return (
		<Card>
			<CardHeader className='text-center'>
				<CardTitle className='text-2xl font-bold'>404 - Not Found</CardTitle>
				<CardDescription className='text-base'>
					Could not find requested resource
				</CardDescription>
			</CardHeader>

			<CardFooter>
				<Link
					href='/'
					className={cn(buttonVariants({ variant: 'default' }), 'w-full')}>
					Return Home
				</Link>
			</CardFooter>
		</Card>
	)
}

export default NotFound
