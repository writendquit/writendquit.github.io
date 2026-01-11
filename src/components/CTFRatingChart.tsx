import { useMemo } from 'react'

export default function CTFRatingChart() {
  const data = useMemo(() => {
    return [
      { month: 'Jan', rating: 1250 },
      { month: 'Feb', rating: 1380 },
      { month: 'Mar', rating: 1420 },
      { month: 'Apr', rating: 1550 },
      { month: 'May', rating: 1480 },
      { month: 'Jun', rating: 1620 },
      { month: 'Jul', rating: 1750 },
      { month: 'Aug', rating: 1820 },
      { month: 'Sep', rating: 1780 },
      { month: 'Oct', rating: 1847 },
    ]
  }, [])

  const maxRating = Math.max(...data.map((d) => d.rating))
  const minRating = Math.min(...data.map((d) => d.rating))
  const range = maxRating - minRating || 1
  const padding = range * 0.1

  const getY = (rating: number) => {
    return 100 - ((rating - minRating + padding) / (range + 2 * padding)) * 80 - 10
  }

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = getY(d.rating)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div>
      <div className="relative h-48">
        <svg 
          viewBox="0 0 100 100" 
          className="h-full w-full" 
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.2"
            />
          ))}

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100
            const y = getY(d.rating)
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1"
                fill="currentColor"
                className="transition-all hover:r-[1.5]"
              />
            )
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
        <div>
          <span className="text-muted-foreground">Peak: </span>
          <span className="font-medium">{maxRating}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Current: </span>
          <span className="font-medium">{data[data.length - 1].rating}</span>
        </div>
      </div>
    </div>
  )
}
