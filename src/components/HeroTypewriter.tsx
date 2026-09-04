import React, { useState, useEffect } from 'react';

interface HeroTypewriterProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const DEFAULT_PHRASES = [
  'Right Assistance.',
  'Zero Confusion.',
  'Expert Document Guidance.',
  'Fast Government Filings.',
  'Reliable Business Support.',
  'Easy Loan Guidance.',
];

export const HeroTypewriter: React.FC<HeroTypewriterProps> = ({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2200,
  className = '',
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      return;
    }

    const currentFullPhrase = phrases[phraseIndex % phrases.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Currently Typing
      if (displayText.length < currentFullPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Currently Deleting
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  return (
    <span
      className={`inline-flex items-baseline relative text-blue-600 underline decoration-amber-400 decoration-wavy decoration-2 transition-all ${className}`}
      aria-label={phrases[phraseIndex % phrases.length]}
    >
      <span className="font-extrabold">{displayText || '\u00A0'}</span>
      {!prefersReducedMotion && (
        <span
          className="inline-block w-[3px] h-[0.8em] ml-1 bg-amber-500 animate-pulse rounded-full self-center"
          aria-hidden="true"
        />
      )}
    </span>
  );
};
