"use client";

import React, { useState, useEffect } from "react";

// Curated pool of high-impact, industry-relevant phrases for ANVIEO LMS
const HERO_TYPEWRITER_PHRASES: string[] = [
  "akselerasi karir impianmu.",
  "kuasai AI & machine learning.",
  "jadilah software architect.",
  "pimpin transformasi digital.",
  "bangun portofolio kelas dunia.",
  "raih sertifikasi global IEEE.",
  "tembus perusahaan impianmu.",
  "kuasai cloud & DevOps modern.",
  "kembangkan solusi cerdas AI.",
  "bimbingan praktisi senior.",
  "evaluasi kode cepat < 12 jam.",
  "pelajari hukum bisnis & AI.",
  "analisis data & quant finance.",
  "tingkatkan nilai pasarmu.",
  "kuasai cyber security handal.",
  "wujudkan karir globalmu.",
  "cetak inovasi masa depan.",
  "jadi talenta incaran industri.",
  "taklukkan tantangan baru.",
  "arsiteki sistem skala besar.",
  "kuasai web enterprise modern.",
  "raih lompatan karir terbaik.",
  "kuasai AI agent terdepan.",
  "bangun masa depan digital.",
];

export default function TypewriterHeroText() {
  const [displayedText, setDisplayedText] = useState<string>(HERO_TYPEWRITER_PHRASES[0]);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = HERO_TYPEWRITER_PHRASES[phraseIndex];

    if (isPaused) {
      // Pause after full typing (2.2s) or after full backspacing (0.35s)
      timer = setTimeout(() => {
        setIsPaused(false);
      }, isDeleting ? 350 : 2200);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        // Natural human typing cadence (50ms - 85ms per character)
        const typingDelay = 50 + Math.floor(Math.random() * 35);
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, typingDelay);
      } else {
        // Full phrase typed, pause before deleting
        setIsPaused(true);
        setIsDeleting(true);
      }
    } else {
      if (displayedText.length > 0) {
        // Quick backspacing (28ms per character)
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 28);
      } else {
        // Completely erased, pick a random phrase different from current
        setIsPaused(true);
        setIsDeleting(false);
        setPhraseIndex((prev) => {
          let next = Math.floor(Math.random() * HERO_TYPEWRITER_PHRASES.length);
          while (next === prev && HERO_TYPEWRITER_PHRASES.length > 1) {
            next = Math.floor(Math.random() * HERO_TYPEWRITER_PHRASES.length);
          }
          return next;
        });
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isPaused, phraseIndex]);

  return (
    <span
      className="blackbox-hero-h1-blue hero-typewriter-wrapper"
      aria-label={`akselerasi karir impianmu. ${HERO_TYPEWRITER_PHRASES[phraseIndex]}`}
    >
      <span className="hero-typewriter-text">{displayedText}</span>
      <span className="hero-typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
