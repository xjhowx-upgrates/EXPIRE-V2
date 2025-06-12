import React from 'react'
import { Clock } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Clock className={`${sizeClasses[size]} text-blue-500 dark:text-blue-400`} />
        <div className="absolute inset-0 animate-pulse">
          <Clock className={`${sizeClasses[size]} text-blue-300 dark:text-blue-600 opacity-50`} />
        </div>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          EXPIRE
        </span>
      )}
    </div>
  )
}

export default Logo