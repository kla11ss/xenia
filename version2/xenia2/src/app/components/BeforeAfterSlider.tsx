import * as React from "react"
import { cn } from "../../lib/utils"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  className?: string
}

export function BeforeAfterSlider({ beforeImage, afterImage, className }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(50)
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    let clientX

    if ('touches' in event) {
      clientX = event.touches[0].clientX
    } else {
      clientX = (event as React.MouseEvent | MouseEvent).clientX
    }

    const position = ((clientX - containerRect.left) / containerRect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, position)))
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        handleMove(e)
      }
    }
    
    const handleGlobalUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMove)
      window.addEventListener('touchmove', handleGlobalMove)
      window.addEventListener('mouseup', handleGlobalUp)
      window.addEventListener('touchend', handleGlobalUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('touchmove', handleGlobalMove)
      window.removeEventListener('mouseup', handleGlobalUp)
      window.removeEventListener('touchend', handleGlobalUp)
    }
  }, [isDragging])

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full overflow-hidden select-none cursor-ew-resize group rounded-2xl", className)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      
      {/* Label After */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-900 pointer-events-none z-10">
        ПОСЛЕ
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 h-full w-full object-cover max-w-none"
          // We set width of image to container width to maintain aspect ratio
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
          draggable={false}
        />
        
        {/* Label Before */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-900 pointer-events-none">
          ДО
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#BFA16F] w-4 h-4">
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      </div>
    </div>
  )
}
