'use client'

import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { ShieldLogo } from '@/components/ui/shield-logo'

type AnimatedShieldLogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function AnimatedShieldLogo({ size = 'md' }: AnimatedShieldLogoProps) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animation = async () => {
      await animate(
        scope.current,
        {
          background: [
            'radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.15), rgba(24, 24, 24, 0))',
            'radial-gradient(circle at 60% 40%, rgba(62, 207, 142, 0.2), rgba(24, 24, 24, 0))',
            'radial-gradient(circle at 40% 60%, rgba(62, 207, 142, 0.15), rgba(24, 24, 24, 0))',
            'radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.15), rgba(24, 24, 24, 0))',
          ],
          scale: [1, 1.05, 0.98, 1],
          filter: [
            'blur(8px) brightness(1.2)',
            'blur(10px) brightness(1.3)',
            'blur(8px) brightness(1.2)',
            'blur(8px) brightness(1.2)',
          ],
        },
        {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      )
    }

    animation()
  }, [animate])

  return (
    <div className="relative">
      <div
        ref={scope}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.15), rgba(24, 24, 24, 0))',
          filter: 'blur(8px) brightness(1.2)',
        }}
      />
      <div className="relative z-10">
        <ShieldLogo size={size} />
      </div>
    </div>
  )
} 