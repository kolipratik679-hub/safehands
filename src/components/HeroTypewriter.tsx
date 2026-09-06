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
  'Expert Guidance.',
  'Fast Filings.',
  'Business Support.',
  'Loan Assistance.',
];

export const HeroTypewriter: React.FC<HeroTypewriterProps> = ({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullPhrase = phrases[phraseIndex % phrases.length];

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFullPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span
      className={`inline relative text-blue-600 underline decoration-amber-400 decoration-wavy decoration-2 transition-all break-words ${className}`}
      aria-label={phrases[phraseIndex % phrases.length]}
    >
      <span className="font-extrabold">{displayText || '\u00A0'}</span>
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 bg-amber-500 animate-pulse rounded-full align-middle flex-shrink-0"
        aria-hidden="true"
      />
    </span>
  );
};
