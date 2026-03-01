import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 80;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.2,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark" />

      {/* Soft center vignette to avoid washed-out mid section */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 55%, hsl(var(--cosmic-deep) / 0.15) 0%, hsl(var(--cosmic-dark) / 0.78) 70%, hsl(var(--cosmic-dark) / 0.95) 100%)",
        }}
      />

      {/* Purple/blue glow near bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--cosmic-purple) / 0.45) 0%, transparent 70%)",
        }}
      />

      {/* Blue glow accent */}
      <div
        className="absolute bottom-20 left-1/3 w-[400px] h-[200px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--cosmic-blue) / 0.5) 0%, transparent 70%)",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-star animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
