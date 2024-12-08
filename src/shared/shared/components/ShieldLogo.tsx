'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'

type ShieldLogoProps = {
	size?: 'xs' | 'sm' | 'md' | 'lg'
	animated?: boolean
	animationVariant?: 'trace' | 'pulse'
	hasLink?: boolean
	linkTo?: string
	tooltipContent?: string
}

const sizeMap = {
	xs: 'w-6 h-6',
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-12 h-12'
}

export function ShieldLogo({
	size = 'md',
	animated = false,
	animationVariant = 'pulse',
	hasLink = false,
	linkTo = '/',
	tooltipContent
}: ShieldLogoProps) {
	const Logo = (
		<Shield
			className={`${sizeMap[size]} text-[#3ECF8E] ${
				animated
					? animationVariant === 'trace'
						? 'animate-trace'
						: 'animate-pulse'
					: ''
			}`}
			strokeWidth={1.5}
		/>
	)

	if (!hasLink) return Logo

	const LinkedLogo = (
		<Link href={linkTo} className="hover:opacity-80 transition-opacity">
			{Logo}
		</Link>
	)

	if (!tooltipContent) return LinkedLogo

	return (
		<Tooltip>
			<TooltipTrigger asChild>{LinkedLogo}</TooltipTrigger>
			<TooltipContent side="right">
				<p>{tooltipContent}</p>
			</TooltipContent>
		</Tooltip>
	)
}

