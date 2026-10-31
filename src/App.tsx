/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Step } from './types';
import { AudioPlayer } from './components/AudioPlayer';
import { musicManager } from './utils/audio';
import { EnvelopeStep } from './components/EnvelopeStep';
import { PersonalityCardStep } from './components/PersonalityCardStep';
import { MountainCampStep } from './components/MountainCampStep';
import { PolaroidStep } from './components/PolaroidStep';
import { FinalDiscoveryStep } from './components/FinalDiscoveryStep';
import { Sparkles, Heart } from 'lucide-react';

const stepsList: { key: Step; title: string }[] = [
  { key: 'envelope', title: 'Envelope 💌' },
  { key: 'personality', title: 'Personality Audit 😂' },
  { key: 'mountain', title: 'Pahad & Sukoon 🏔️' },
  { key: 'polaroid', title: 'Polaroid Frame 📸' },
  { key: 'final', title: 'Back to Reels 📱' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('envelope');

  // Trigger song as soon as the link/website is opened
  useEffect(() => {
    musicManager.attemptAutoplay();
  }, []);

  const stepIndex = stepsList.findIndex((s) => s.key === currentStep);

  const goToNextStep = () => {
    if (currentStep === 'envelope') setCurrentStep('personality');
    else if (currentStep === 'personality') setCurrentStep('mountain');
    else if (currentStep === 'mountain') setCurrentStep('polaroid');
    else if (currentStep === 'polaroid') setCurrentStep('final');
  };

  const handleRestart = () => {
    setCurrentStep('envelope');
  };

  const handleJumpToStep = (step: 'personality' | 'mountain' | 'polaroid') => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#332C27] flex flex-col justify-between relative selection:bg-[#F9D5D3] selection:text-[#5E3023] overflow-x-hidden">
      {/* Scrapbook Aesthetic Paper Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 bg-cover bg-center mix-blend-multiply"
        style={{
          backgroundImage: "url('/src/assets/images/scrapbook_paper_bg_1793448482032.jpg')",
        }}
      />
      
      {/* Delicate Paper Dots Pattern */}
      <div className="fixed inset-0 bg-paper-dots opacity-40 pointer-events-none" />

      {/* Decorative Washi Tapes in Corners */}
      <div className="fixed top-2 left-3 z-0 washi-tape-pink w-20 h-5 -rotate-12 rounded-sm opacity-60 pointer-events-none hidden sm:block" />
      <div className="fixed bottom-3 right-4 z-0 washi-tape-sage w-24 h-5 6 rotate-6 rounded-sm opacity-60 pointer-events-none hidden sm:block" />

      {/* Top Bar Contract (Wordmark + Step Indicators + Audio Player) */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#EBE2D3]/80">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2">
            <h1 className="font-hand text-2xl sm:text-3xl font-bold text-[#332C27] tracking-tight hover:text-[#B85B43] transition-colors cursor-default whitespace-nowrap">
              Annu's Little Corner ✨
            </h1>
          </div>

          {/* Minimalist Scrapbook Step Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {stepsList.map((step, idx) => (
              <div
                key={step.key}
                className={`transition-all duration-300 flex items-center gap-1.5 ${
                  idx === stepIndex
                    ? 'text-[#B85B43] font-semibold text-xs'
                    : idx < stepIndex
                    ? 'text-[#8C7A6B] text-xs'
                    : 'text-[#D0C4B8] text-xs'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    idx === stepIndex
                      ? 'bg-[#B85B43] scale-125'
                      : idx < stepIndex
                      ? 'bg-[#8C7A6B]'
                      : 'bg-[#DCD0C2]'
                  }`}
                />
                {idx === stepIndex && (
                  <span className="font-hand text-base hidden md:inline">
                    {step.title}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Continuous Music Player (Naaraazgi) */}
          <AudioPlayer />
        </div>
      </header>

      {/* Progressive Discovery Journey Viewport */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {currentStep === 'envelope' && (
            <motion.div
              key="step-envelope"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <EnvelopeStep onOpen={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 'personality' && (
            <motion.div
              key="step-personality"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PersonalityCardStep onNext={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 'mountain' && (
            <motion.div
              key="step-mountain"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <MountainCampStep onNext={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 'polaroid' && (
            <motion.div
              key="step-polaroid"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PolaroidStep onNext={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 'final' && (
            <motion.div
              key="step-final"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <FinalDiscoveryStep
                onRestart={handleRestart}
                onJumpToStep={handleJumpToStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Scrapbook Footnote */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-[#EBE2D3]/60 text-xs text-[#8C7A6B] font-body">
        <div className="flex items-center justify-center gap-1.5 font-hand text-lg text-[#6E5D52]">
          <span>Annu ke liye pyaar se banaya gaya ✨</span>
          <span className="text-[#B85B43]">•</span>
          <span>Is process mein kisi reel ko nuksan nahi pahucha 😂</span>
        </div>
      </footer>
    </div>
  );
}
