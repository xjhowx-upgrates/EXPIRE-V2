import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

interface TimeContextType {
  availableMinutes: number
  spendMinutes: (amount: number) => Promise<boolean>
  addMinutes: (amount: number) => Promise<void>
  refreshMinutes: () => Promise<void>
}

const TimeContext = createContext<TimeContextType | undefined>(undefined)

export const useTime = () => {
  const context = useContext(TimeContext)
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider')
  }
  return context
}

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth()
  const [availableMinutes, setAvailableMinutes] = useState(120) // 2 horas iniciais

  useEffect(() => {
    if (currentUser) {
      loadUserMinutes()
      // Adicionar minutos a cada hora
      const interval = setInterval(() => {
        addMinutes(10) // 10 minutos por hora
      }, 60 * 60 * 1000)

      return () => clearInterval(interval)
    }
  }, [currentUser])

  const loadUserMinutes = async () => {
    if (!currentUser) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('available_minutes')
        .eq('id', currentUser.id)
        .single()

      if (error) {
        // If no profile exists, create one
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: currentUser.id,
              available_minutes: 120
            })
            .select('available_minutes')
            .single()

          if (insertError) {
            console.error('Error creating profile:', insertError)
            return
          }

          if (newProfile?.available_minutes !== undefined) {
            setAvailableMinutes(newProfile.available_minutes)
          }
        } else {
          throw error
        }
      } else if (data?.available_minutes !== undefined) {
        setAvailableMinutes(data.available_minutes)
      }
    } catch (error) {
      console.error('Error loading user minutes:', error)
    }
  }

  const spendMinutes = async (amount: number): Promise<boolean> => {
    if (availableMinutes < amount) {
      return false
    }

    const newMinutes = availableMinutes - amount
    setAvailableMinutes(newMinutes)

    if (currentUser) {
      try {
        await supabase
          .from('profiles')
          .update({ available_minutes: newMinutes })
          .eq('id', currentUser.id)
      } catch (error) {
        console.error('Error updating minutes:', error)
        // Reverter se falhar
        setAvailableMinutes(availableMinutes)
        return false
      }
    }

    return true
  }

  const addMinutes = async (amount: number): Promise<void> => {
    const newMinutes = Math.min(availableMinutes + amount, 480) // Máximo 8 horas
    setAvailableMinutes(newMinutes)

    if (currentUser) {
      try {
        await supabase
          .from('profiles')
          .update({ available_minutes: newMinutes })
          .eq('id', currentUser.id)
      } catch (error) {
        console.error('Error adding minutes:', error)
      }
    }
  }

  const refreshMinutes = async (): Promise<void> => {
    await loadUserMinutes()
  }

  return (
    <TimeContext.Provider value={{ availableMinutes, spendMinutes, addMinutes, refreshMinutes }}>
      {children}
    </TimeContext.Provider>
  )
}