const HorizonCurve = () => {
  return (
    <div className="absolute bottom-20 left-0 right-0 pointer-events-none">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="horizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="50%" stopColor="hsl(0, 0%, 100%)" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0 80 Q360 40 720 50 Q1080 60 1440 30"
          stroke="url(#horizonGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          className="animate-glow-pulse"
        />
      </svg>
    </div>
  );
};

export default HorizonCurve;
