import { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypingEffect = ({
  text,
  speed = 35,
  onComplete,
  className = "",
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setShowCursor(true);
  }, [text]);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      setTimeout(() => setShowCursor(false), 500);
      setTimeout(() => onComplete?.(), 600);
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  useEffect(() => {
    if (!isComplete) {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(blinkInterval);
    }
  }, [isComplete]);

  return (
    <div className={`typing-container ${className}`}>
      <p className="text-lg md:text-xl text-foreground leading-relaxed">
        {displayedText}
        <span
          className={`inline-block w-0.5 h-6 bg-foreground ml-1 align-middle transition-opacity duration-100 ${
            showCursor && !isComplete ? "opacity-100" : "opacity-0"
          }`}
        />
      </p>
    </div>
  );
};

export default TypingEffect;
