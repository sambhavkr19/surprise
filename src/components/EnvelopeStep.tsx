import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { musicManager } from '../utils/audio';
import { Mail, Sparkles, AlertCircle, ArrowRight, Music2 } from 'lucide-react';

interface EnvelopeStepProps {
  onOpen: () => void;
}

export const EnvelopeStep: React.FC<EnvelopeStepProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = musicManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsub;
  }, []);

  const handleStart = () => {
    // Start music on first interaction
    musicManager.play();
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-8">
      {/* Decorative Scrapbook Elements */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center"
      >
        <span className="font-hand text-2xl text-[#8C7A6B] tracking-wide inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#C98B6D]" /> Annu Ke Liye Special Dispatch <Sparkles className="w-4 h-4 text-[#C98B6D]" />
        </span>
      </motion.div>

      {/* Handcrafted Envelope Container */}
      <div className="relative w-full max-w-md perspective-1000">
        {/* Floating Washi Tape top-left */}
        <div className="absolute -top-3 left-6 z-30 washi-tape-pink w-24 h-6 -rotate-6 rounded-sm opacity-90 pointer-events-none" />
        {/* Floating Postage Stamp top-right */}
        <div className="absolute -top-5 right-6 z-30 bg-[#FFF9F2] border-2 border-dashed border-[#D4C3B3] px-2.5 py-1.5 rounded rotate-3 paper-shadow text-[11px] font-mono text-[#8C7A6B] flex items-center gap-1 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#E57373]" /> AIR MAIL · Annu Special 💌
        </div>

        {/* The Envelope Card */}
        <motion.div
          animate={isOpening ? { rotateX: 25, scale: 0.96, opacity: 0.8 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-[#F7F2E9] border border-[#E3D6C5] rounded-2xl p-6 sm:p-8 paper-shadow-lg text-center overflow-hidden"
        >
          {/* Subtle paper grid background */}
          <div className="absolute inset-0 bg-paper-grid opacity-30 pointer-events-none" />

          {/* Envelope Flap Accent */}
          <div className="w-20 h-1 bg-[#D9CAB7] rounded-full mx-auto mb-6 opacity-60" />

          {/* Letter Content Peek */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 bg-[#FFFDF9] border border-[#EADFCB] rounded-xl p-6 sm:p-7 paper-shadow"
          >
            {/* Wax Seal Stamp Motif */}
            <div className="w-12 h-12 mx-auto -mt-12 mb-4 bg-[#B85B43] rounded-full flex items-center justify-center text-[#FFFDF9] shadow-md border-2 border-[#D97960] rotate-[-8deg]">
              <span className="font-hand text-2xl font-bold">A</span>
            </div>

            {/* Breaking News Tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B85B43] bg-[#FDF0EC] px-3 py-1 rounded-full mb-3">
              <AlertCircle className="w-3.5 h-3.5" /> Breaking News 🚨
            </div>

            {/* Headline */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#332C27] leading-snug tracking-tight mb-3">
              Annu ko fir se reels scroll karte hue pakda gaya hai! 😂
            </h1>

            {/* Subtitle */}
            <p className="font-hand text-2xl sm:text-3xl text-[#6B5A4E] leading-relaxed mb-6">
              "Kuch random sa wait kar raha hai tumhare liye..."
            </p>

            {/* Hand-drawn Arrow Doodle */}
            <div className="flex justify-center mb-5 text-[#8C7A6B]">
              <svg width="60" height="28" viewBox="0 0 60 28" fill="none" className="stroke-current">
                <path d="M5 6C20 4 35 22 55 18" strokeWidth="2" strokeLinecap="round" />
                <path d="M47 12L56 18L48 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Main Action Button (Only 1 primary button as requested!) */}
            <button
              onClick={handleStart}
              disabled={isOpening}
              className="w-full group relative py-3.5 px-6 rounded-xl bg-[#332C27] hover:bg-[#453B34] text-[#FAF7F2] font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
            >
              <span>{isOpening ? "Envelope khul raha hai..." : "Chalo dekhte hain 👀"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Bottom Washi Tape */}
          <div className="absolute -bottom-2 right-8 z-20 washi-tape-sage w-20 h-5 rotate-3 rounded-sm opacity-80 pointer-events-none" />
        </motion.div>
      </div>

      {/* Gentle helper note / playing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-xs text-[#9C8B7E] font-body flex items-center gap-1.5"
      >
        {isPlaying ? (
          <span className="inline-flex items-center gap-1.5 text-[#B85B43] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#B85B43] animate-ping" />
            Naaraazgi song baj raha hai 🎵🎧
          </span>
        ) : (
          <button
            onClick={() => musicManager.play()}
            className="hover:text-[#B85B43] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B85B43]" />
            Kahin bhi tap karo ya button dabao, Naaraazgi song shuru ho jayega 🎧
          </button>
        )}
      </motion.div>
    </div>
  );
};
