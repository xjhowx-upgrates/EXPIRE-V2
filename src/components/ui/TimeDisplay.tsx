import React from 'react'
import { Clock, Plus } from 'lucide-react'
import { useTime } from '../../contexts/TimeContext'

const TimeDisplay: React.FC = () => {
  const { availableMinutes } = useTime()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getTimeColor = () => {
    if (availableMinutes <= 30) return 'text-red-500 dark:text-red-400'
    if (availableMinutes <= 60) return 'text-yellow-500 dark:text-yellow-400'
    return 'text-green-500 dark:text-green-400'
  }

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <span className={`font-medium ${getTimeColor()}`}>
        {formatTime(availableMinutes)}
      </span>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        disponíveis
      </div>
    </div>
  )
}

export default TimeDisplay