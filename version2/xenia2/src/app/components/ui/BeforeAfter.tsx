import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "../../../lib/utils";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "До",
  afterLabel = "После",
  className,
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - containerRect.left) / containerRect.width) * 100;

    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleInteractionEnd);
      window.addEventListener("touchend", handleInteractionEnd);
      window.addEventListener("mousemove", handleMove as any);
      window.addEventListener("touchmove", handleMove as any);
    } else {
      window.removeEventListener("mouseup", handleInteractionEnd);
      window.removeEventListener("touchend", handleInteractionEnd);
      window.removeEventListener("mousemove", handleMove as any);
      window.removeEventListener("touchmove", handleMove as any);
    }
    return () => {
      window.removeEventListener("mouseup", handleInteractionEnd);
      window.removeEventListener("touchend", handleInteractionEnd);
      window.removeEventListener("mousemove", handleMove as any);
      window.removeEventListener("touchmove", handleMove as any);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none cursor-ew-resize group touch-none",
        className
      )}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
    >
      <div className="aspect-[4/3] relative w-full overflow-hidden">
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 z-10 pointer-events-none">
          {afterLabel}
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 z-10 pointer-events-none">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-xl"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
            <ChevronsLeftRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
