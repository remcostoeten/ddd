'use client'

import Link from 'next/link'

type ShieldLogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

export function ShieldLogo({ size = 'md' }: ShieldLogoProps) {
  return (
    <Link href="/dashboard" className="block">
      <svg
        className={`${sizeClasses[size]} text-[#3ECF8E]`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.64 20.59 3.09 16.01 3.09 11.12V6.73C3.09 5.91 3.71 4.98 4.48 4.67L10.05 2.39C11.3 1.93 12.71 1.93 13.96 2.39L19.53 4.67C20.29 4.98 20.92 5.91 20.92 6.73V11.12H20.91Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.5V15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
} 