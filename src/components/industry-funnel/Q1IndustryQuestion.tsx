import { useState, useRef, useEffect } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const INDUSTRIES = [
  'Plumber', 'Electrician', 'HVAC', 'Roofing', 'Builder',
  'Dentist', 'Physiotherapist', 'Attorney', 'Accountant',
  'Hair Salon', 'Beauty Spa', 'Restaurant', 'Cafe', 'Gym',
  'Auto Mechanic', 'Real Estate', 'Cleaning Services',
  'Photographer', 'Veterinarian', 'Other',
];

export function Q1IndustryQuestion() {
  const { data, updateData, setCurrentQuestion } = useIndustryFunnel();
  const [query, setQuery] = useState(data.industry);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = INDUSTRIES.filter(i =>
    i.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (industry: string) => {
    setQuery(industry);
    updateData('industry', industry);
    setShowDropdown(false);
  };

  const handleContinue = () => {
    if (query.trim()) {
      updateData('industry', query.trim());
      setTimeout(() => setCurrentQuestion(2), 200);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <IndustryQuestionCard
      question="Let's make sure we can help you."
      subhead="What type of business do you run?"
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        <Input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder="e.g. Plumbing, Dental Practice, Hair Salon..."
          className="h-14 text-base rounded-xl border-primary/20 focus:border-accent"
        />
        {showDropdown && query.length > 0 && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {filtered.map(industry => (
              <button
                key={industry}
                onClick={() => handleSelect(industry)}
                className="w-full text-left px-4 py-3 hover:bg-accent/10 text-foreground transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {industry}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        onClick={handleContinue}
        disabled={!query.trim()}
        className="btn-primary mt-4"
      >
        Continue →
      </Button>
    </IndustryQuestionCard>
  );
}
