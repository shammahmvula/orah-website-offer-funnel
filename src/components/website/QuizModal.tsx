import { useState, useEffect, useCallback } from "react";
import { Sparkles, CheckCircle2, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";
import orahLogo from "@/assets/orah-logo.png";
import TypingEffect from "./TypingEffect";
import { supabase } from "@/integrations/supabase/client";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizAnswers {
  businessType: string;
  yearsInBusiness: string;
  location: string;
  multipleLocations: boolean;
  locationCount: string;
  websiteStatus: string;
  reviewCount: string;
  reviewFrequency: string;
  callHandling: string;
  biggestChallenge: string;
  readyToStart: string;
  objection: string;
}

type SlideType = "question" | "conversational" | "didYouKnow" | "pitch" | "objection" | "result";

interface Slide {
  type: SlideType;
  id: string;
  question?: string;
  options?: string[];
  answerKey?: keyof QuizAnswers;
  typingText?: string;
  factText?: string;
  showForm?: boolean;
}

const slides: Slide[] = [
  {
    type: "question",
    id: "businessType",
    question: "What type of business do you run?",
    options: [
      "Restaurant / Café",
      "Salon / Spa / Beauty",
      "Dental / Medical Practice",
      "Estate Agency",
      "Home Services (Plumber, Electrician, etc.)",
      "Other Local Business",
    ],
    answerKey: "businessType",
  },
  {
    type: "conversational",
    id: "businessDetails",
    typingText: "Oh that's fantastic! Running a {businessType} is no small feat. Let's learn a bit more about you...",
    showForm: true,
  },
  {
    type: "question",
    id: "websiteStatus",
    question: "Do you currently have a website?",
    options: [
      "Yes, but it's outdated or embarrassing",
      "Yes, and it's decent",
      "No website yet",
      "I have a Facebook page only",
    ],
    answerKey: "websiteStatus",
  },
  {
    type: "didYouKnow",
    id: "fact1",
    factText: "88% of customers won't return to a website after a bad experience. Your website isn't just a page — it's your 24/7 salesperson. And right now, it might be turning customers away.",
  },
  {
    type: "question",
    id: "reviewCount",
    question: "How many Google reviews does your business have?",
    options: ["0-10 reviews", "11-30 reviews", "31-50 reviews", "50+ reviews"],
    answerKey: "reviewCount",
  },
  {
    type: "question",
    id: "reviewFrequency",
    question: "How often do customers leave you reviews?",
    options: [
      "Almost never (it's frustrating)",
      "Sometimes, if I ask nicely",
      "Regularly, we have a system",
      "I don't really track this",
    ],
    answerKey: "reviewFrequency",
  },
  {
    type: "didYouKnow",
    id: "fact2",
    factText: "The average local business loses R126,000 every single year to missed calls, invisible search rankings, and a handful of outdated reviews. That's not a slow leak — that's a flood. And most business owners have no idea it's happening.",
  },
  {
    type: "question",
    id: "callHandling",
    question: "How do you handle calls when you're busy or after hours?",
    options: [
      "They go to voicemail (most don't leave messages)",
      "Staff answers when available",
      "I try to answer everything myself",
      "We miss a lot of calls honestly",
    ],
    answerKey: "callHandling",
  },
  {
    type: "question",
    id: "biggestChallenge",
    question: "What's your biggest challenge right now?",
    options: [
      "Not enough new leads or enquiries",
      "Leads aren't converting to customers",
      "Competitors seem to be everywhere",
      "I don't have time to manage all this",
      "All of the above",
    ],
    answerKey: "biggestChallenge",
  },
  {
    type: "didYouKnow",
    id: "fact3",
    factText: "85% of people whose calls go unanswered will never call back. They're not leaving voicemails — they're calling your competitor. The one who picked up.",
  },
  {
    type: "pitch",
    id: "pitch",
    typingText: "Here's the truth: while you're busy delivering great service, your competitors are stacking reviews, ranking higher, and stealing the customers who should've been yours. We fix that.\n\nOur AI-powered Growth System floods your business with 49+ genuine Google reviews every single month — on autopilot. More reviews. Higher rankings. More customers walking through your door instead of theirs.",
  },
  {
    type: "objection",
    id: "objection",
    typingText: "No pressure at all. But quick question...",
    question: "What's the main thing holding you back?",
    options: [
      "Not the right time",
      "Need to think about it",
      "Not sure it'll work for my business",
      "Budget concerns",
      "Just browsing",
    ],
    answerKey: "objection",
  },
  {
    type: "result",
    id: "result",
  },
];

const qualifyingSteps = [
  { title: "Analyzing your responses...", subtitle: "Reviewing business profile" },
  { title: "Evaluating growth potential...", subtitle: "Checking market opportunity" },
  { title: "Assessing digital presence...", subtitle: "Comparing to competitors" },
  { title: "Calculating ROI potential...", subtitle: "Estimating revenue impact" },
  { title: "Checking availability...", subtitle: "Matching with strategy team" },
  { title: "Finalizing assessment...", subtitle: "Preparing your results" },
];

const QuizModal = ({ isOpen }: QuizModalProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    businessType: "",
    yearsInBusiness: "",
    location: "",
    multipleLocations: false,
    locationCount: "",
    websiteStatus: "",
    reviewCount: "",
    reviewFrequency: "",
    callHandling: "",
    biggestChallenge: "",
    readyToStart: "",
    objection: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isQualifying, setIsQualifying] = useState(false);
  const [qualifyingStep, setQualifyingStep] = useState(0);
  const [completedQualifyingSteps, setCompletedQualifyingSteps] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"enter" | "exit">("enter");

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];

  const resetQuiz = useCallback(() => {
    setCurrentSlideIndex(0);
    setAnswers({
      businessType: "",
      yearsInBusiness: "",
      location: "",
      multipleLocations: false,
      locationCount: "",
      websiteStatus: "",
      reviewCount: "",
      reviewFrequency: "",
      callHandling: "",
      biggestChallenge: "",
      readyToStart: "",
      objection: "",
    });
    setIsAnimating(false);
    setTypingComplete(false);
    setIsQualifying(false);
    setQualifyingStep(0);
    setCompletedQualifyingSteps([]);
    setShowResult(false);
    setSlideDirection("enter");
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetQuiz();
    }
  }, [isOpen, resetQuiz]);

  useEffect(() => {
    setTypingComplete(false);
  }, [currentSlideIndex]);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#facc15", "#22c55e", "#3b82f6"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#facc15", "#22c55e", "#3b82f6"],
      });
    }, 250);
  }, []);

  useEffect(() => {
    if (isQualifying && qualifyingStep < qualifyingSteps.length) {
      const timer = setTimeout(() => {
        setCompletedQualifyingSteps((prev) => [...prev, qualifyingStep]);
        setTimeout(() => {
          if (qualifyingStep < qualifyingSteps.length - 1) {
            setQualifyingStep((prev) => prev + 1);
          } else {
            setTimeout(() => {
              setIsQualifying(false);
              setShowResult(true);
              fireConfetti();

              // Save lead to website_leads table
              const params = new URLSearchParams(window.location.search);
              supabase.from('website_leads').insert({
                business_type: answers.businessType || null,
                years_in_business: answers.yearsInBusiness || null,
                location: answers.location || null,
                multiple_locations: answers.multipleLocations || false,
                location_count: answers.locationCount || null,
                website_status: answers.websiteStatus || null,
                review_count: answers.reviewCount || null,
                review_frequency: answers.reviewFrequency || null,
                call_handling: answers.callHandling || null,
                biggest_challenge: answers.biggestChallenge || null,
                ready_to_start: answers.readyToStart || null,
                objection: answers.objection || null,
                utm_source: params.get('utm_source') || null,
                utm_medium: params.get('utm_medium') || null,
                utm_campaign: params.get('utm_campaign') || null,
                utm_content: params.get('utm_content') || null,
                utm_term: params.get('utm_term') || null,
              }).then(({ error }) => {
                if (error) console.error('Failed to save website lead:', error);
              });
            }, 1200);
          }
        }, 600);
      }, 2000 + Math.random() * 1000);

      return () => clearTimeout(timer);
    }
  }, [isQualifying, qualifyingStep, fireConfetti]);

  const advanceToNextSlide = useCallback(() => {
    setSlideDirection("exit");
    setTimeout(() => {
      if (currentSlideIndex === 10 && answers.readyToStart.includes("Yes")) {
        setIsQualifying(true);
        setCurrentSlideIndex(12);
      } else if (currentSlideIndex === 11) {
        setIsQualifying(true);
        setCurrentSlideIndex(12);
      } else if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
      }
      setSlideDirection("enter");
    }, 200);
  }, [currentSlideIndex, answers.readyToStart, totalSlides]);

  const handleOptionSelect = (option: string) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (currentSlide.answerKey) {
      setAnswers((prev) => ({ ...prev, [currentSlide.answerKey!]: option }));
    }

    setTimeout(() => {
      advanceToNextSlide();
      setIsAnimating(false);
    }, 300);
  };

  const handleReadyToStart = (option: string) => {
    setAnswers((prev) => ({ ...prev, readyToStart: option }));
    const isYes = option.includes("Yes");
    setSlideDirection("exit");
    setTimeout(() => {
      if (isYes) {
        setIsQualifying(true);
        setCurrentSlideIndex(12);
      } else {
        setCurrentSlideIndex(11);
      }
      setSlideDirection("enter");
    }, 200);
  };

  const handleFormContinue = () => {
    advanceToNextSlide();
  };

  const handleContinue = () => {
    advanceToNextSlide();
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  const getTypingTextWithReplacements = (text: string) => {
    return text.replace("{businessType}", answers.businessType || "business");
  };

  const isFormValid = () => {
    return answers.yearsInBusiness.trim() !== "" && answers.location.trim() !== "";
  };

  if (!isOpen) return null;

  const progress = ((currentSlideIndex + 1) / totalSlides) * 100;

  const renderSlideContent = () => {
    if (isQualifying && !showResult) {
      return (
        <div className="animate-fade-up">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Checking if you qualify...
            </h2>
            <p className="text-muted-foreground">
              Please wait while we analyze your responses
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {qualifyingSteps.map((step, index) => {
              const isCompleted = completedQualifyingSteps.includes(index);
              const isCurrent = index === qualifyingStep && !isCompleted;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ${
                    isCompleted
                      ? "border-primary/50 bg-primary/5"
                      : isCurrent
                      ? "border-accent/50 bg-accent/5"
                      : "border-border/30 bg-muted/20 opacity-40"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                        ? "bg-accent/20"
                        : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 animate-scale-in" />
                    ) : isCurrent ? (
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium transition-colors ${
                        isCompleted ? "text-foreground" : isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isCompleted || isCurrent ? "text-muted-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                  {isCompleted && <span className="text-xs text-primary font-medium animate-fade-in">Done</span>}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-accent"
                style={{
                  animation: "pulse 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (showResult) {
      const emailSubject = encodeURIComponent("I Want to Grow My Business with ORAH");
      const emailBody = encodeURIComponent(
        `Hi ORAH Team,\n\nI just completed the quiz on your website and I'm interested in learning how your AI-powered Growth System can help my business.\n\nHere's a bit about me:\n• Business type: ${answers.businessType || "N/A"}\n• Years in business: ${answers.yearsInBusiness || "N/A"}\n• Location: ${answers.location || "N/A"}\n• Current Google reviews: ${answers.reviewCount || "N/A"}\n• Biggest challenge: ${answers.biggestChallenge || "N/A"}\n\nI'd love to book a free strategy call to discuss how we can start getting more reviews, more visibility, and more customers.\n\nLooking forward to hearing from you!\n\nBest regards`
      );
      const mailtoLink = `mailto:growth@getorah.co.za?subject=${emailSubject}&body=${emailBody}`;

      return (
        <div className="flex flex-col items-center text-center animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 animate-glow-pulse">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-2">You're In!</h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm mb-6">
            You're one conversation away from becoming the most reviewed business in your area. Let's map out your
            unfair advantage.
          </p>

          <div className="w-full max-w-md rounded-lg border border-border/40 bg-muted/30 p-5 mb-6 text-left">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">📧 Your Draft Email</p>
            <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <p><span className="text-foreground/70 font-medium">To:</span> growth@getorah.co.za</p>
              <p><span className="text-foreground/70 font-medium">Subject:</span> I Want to Grow My Business with ORAH</p>
              <hr className="border-border/30 my-2" />
              <p>Hi ORAH Team,</p>
              <p>I just completed the quiz on your website and I'm interested in learning how your AI-powered Growth System can help my business.</p>
              <p className="font-medium text-foreground/70 mt-2">Here's a bit about me:</p>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Business type: {answers.businessType || "N/A"}</li>
                <li>Years in business: {answers.yearsInBusiness || "N/A"}</li>
                <li>Location: {answers.location || "N/A"}</li>
                <li>Current Google reviews: {answers.reviewCount || "N/A"}</li>
                <li>Biggest challenge: {answers.biggestChallenge || "N/A"}</li>
              </ul>
              <p className="mt-2">I'd love to book a free strategy call to discuss how we can start getting more reviews, more visibility, and more customers.</p>
              <p>Looking forward to hearing from you!</p>
            </div>
          </div>

          <a
            href={mailtoLink}
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-lg glow-white hover:scale-105 hover:glow-white-hover transition-all duration-200 inline-block"
          >
            Send Email & Book Your Free Strategy Call →
          </a>
          <p className="text-sm text-muted-foreground mt-4">⏱️ 15 minutes · 🎯 100% free · 🔒 No obligation</p>
          <p className="text-xs text-muted-foreground/60 mt-6">We respect your time. No spam, no pressure, no BS.</p>
        </div>
      );
    }

    switch (currentSlide.type) {
      case "question":
        return (
          <div className={slideDirection === "enter" ? "animate-fade-up" : "animate-slide-left"}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-8">
              {currentSlide.question}
            </h2>
            <div className="space-y-3">
              {currentSlide.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnimating}
                  className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200
                    ${
                      answers[currentSlide.answerKey!] === option
                        ? "border-option-selected-border bg-option-selected-bg"
                        : "border-option-border bg-option-bg hover:border-option-hover-border hover:bg-option-hover-bg"
                    }
                    ${isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <span className="text-secondary-foreground">{option}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "conversational":
        return (
          <div className={slideDirection === "enter" ? "animate-fade-up" : "animate-slide-left"}>
            <TypingEffect
              text={getTypingTextWithReplacements(currentSlide.typingText || "")}
              onComplete={handleTypingComplete}
            />

            {typingComplete && currentSlide.showForm && (
              <div className="mt-8 space-y-6 animate-fade-up">
                <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    How long have you been in business?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3 years"
                    value={answers.yearsInBusiness}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, yearsInBusiness: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-option-bg border border-option-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Where's your business located?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sandton, Gauteng"
                    value={answers.location}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-option-bg border border-option-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Do you have multiple locations?
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setAnswers((prev) => ({ ...prev, multipleLocations: true }))}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        answers.multipleLocations
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-option-border bg-option-bg text-muted-foreground hover:border-option-hover-border"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setAnswers((prev) => ({ ...prev, multipleLocations: false, locationCount: "" }))}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        !answers.multipleLocations
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-option-border bg-option-bg text-muted-foreground hover:border-option-hover-border"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {answers.multipleLocations && (
                  <div className="animate-fade-up">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">How many locations?</label>
                    <input
                      type="text"
                      placeholder="e.g., 3"
                      value={answers.locationCount}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, locationCount: e.target.value }))}
                      className="w-full px-4 py-3.5 bg-option-bg border border-option-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                  </div>
                )}

                <button
                  onClick={handleFormContinue}
                  disabled={!isFormValid()}
                  className={`w-full mt-4 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-200 ${
                    isFormValid() ? "glow-white hover:scale-[1.02] hover:glow-white-hover" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        );

      case "didYouKnow":
        return (
          <div
            className={`flex flex-col items-center text-center ${
              slideDirection === "enter" ? "animate-fade-up" : "animate-slide-left"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lightbulb className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">Did you know?</span>
            <p className="text-lg text-foreground leading-relaxed max-w-md mb-8">{currentSlide.factText}</p>
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg glow-white hover:scale-105 hover:glow-white-hover transition-all duration-200"
            >
              Continue →
            </button>
          </div>
        );

      case "pitch":
        return (
          <div className={slideDirection === "enter" ? "animate-fade-up" : "animate-slide-left"}>
            <TypingEffect
              text={currentSlide.typingText || ""}
              speed={25}
              onComplete={handleTypingComplete}
            />

            {typingComplete && (
              <div className="mt-10 space-y-4 animate-fade-up">
                <p className="text-lg text-foreground text-center font-medium mb-6">
                  Ready to stop leaving money on the table?
                </p>
                <button
                  onClick={() => handleReadyToStart("Yes — let's make it happen 🚀")}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-white hover:scale-[1.02] hover:glow-white-hover transition-all duration-200"
                >
                  Yes — let's make it happen 🚀
                </button>
                <button
                  onClick={() => handleReadyToStart("No thanks, I'll let my competitors keep winning")}
                  className="w-full px-6 py-3 bg-transparent text-muted-foreground text-sm border border-border/50 rounded-lg hover:border-border hover:bg-muted/20 transition-all duration-200"
                >
                  No thanks, I'll let my competitors keep winning
                </button>
              </div>
            )}
          </div>
        );

      case "objection":
        return (
          <div className={slideDirection === "enter" ? "animate-fade-up" : "animate-slide-left"}>
            <TypingEffect
              text={currentSlide.typingText || ""}
              onComplete={handleTypingComplete}
            />

            {typingComplete && (
              <div className="mt-8 animate-fade-up">
                <h3 className="text-lg font-medium text-foreground text-center mb-6">{currentSlide.question}</h3>
                <div className="space-y-3">
                  {currentSlide.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnimating}
                      className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200
                        border-option-border bg-option-bg hover:border-option-hover-border hover:bg-option-hover-bg
                        ${isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      <span className="text-secondary-foreground">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src={orahLogo} alt="ORAH" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-gray-900 font-bold text-lg tracking-wide">ORAH</span>
        </div>
        <span className="text-sm text-gray-500">Step {currentSlideIndex + 1} of {totalSlides}</span>
      </div>

      <div className="h-1 w-full bg-gray-100">
        <div
          className="h-full progress-gradient transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg quiz-light-theme">{renderSlideContent()}</div>
      </div>
    </div>
  );
};

export default QuizModal;
