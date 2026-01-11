import { useState, useMemo } from 'react'

interface DayData {
  date: Date
  tasks: number
  isCurrentMonth: boolean
  isToday: boolean
}

export default function SprintCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const monthData = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    
    const days: DayData[] = []
    const today = new Date()
    
    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i)
      days.push({
        date,
        tasks: Math.floor(Math.random() * 5),
        isCurrentMonth: false,
        isToday: false,
      })
    }
    
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const isToday = date.toDateString() === today.toDateString()
      days.push({
        date,
        tasks: Math.floor(Math.random() * 8),
        isCurrentMonth: true,
        isToday,
      })
    }
    
    // Next month padding
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        tasks: Math.floor(Math.random() * 3),
        isCurrentMonth: false,
        isToday: false,
      })
    }
    
    return days
  }, [currentDate])

  const getIntensity = (tasks: number) => {
    if (tasks === 0) return 'bg-muted'
    if (tasks <= 2) return 'bg-foreground/20'
    if (tasks <= 4) return 'bg-foreground/40'
    if (tasks <= 6) return 'bg-foreground/60'
    return 'bg-foreground/80'
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{monthName}</h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="rounded-md p-2 hover:bg-muted transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="rounded-md p-2 hover:bg-muted transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {monthData.map((day, index) => {
          const isSelected = selectedDate?.toDateString() === day.date.toDateString()
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(day.date)}
              className={`
                relative aspect-square rounded-md p-1 text-sm transition-all
                ${!day.isCurrentMonth ? 'text-muted-foreground/50' : ''}
                ${day.isToday ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : ''}
                ${isSelected ? 'bg-foreground text-background' : 'hover:bg-muted'}
              `}
            >
              <span className="relative z-10">{day.date.getDate()}</span>
              {day.tasks > 0 && !isSelected && (
                <div 
                  className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${getIntensity(day.tasks)}`}
                />
              )}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {monthData.find(d => d.date.toDateString() === selectedDate.toDateString())?.tasks || 0} tasks
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
