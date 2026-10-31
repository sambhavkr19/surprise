import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Smartphone, EyeOff, PhoneOff, Crown, Heart, CheckCircle2 } from 'lucide-react';
import { PersonalityStat } from '../types';

interface PersonalityCardStepProps {
  onNext: () => void;
}

const stats: PersonalityStat[] = [
  {
    id: 'reels',
    label: 'Reels Watching',
    value: 'Professional Level 📱',
    icon: '📱',
    secretRemark: 'Subah se 400 reels dekh chuki ho, sach bolna! Ek bhi meme miss nahi hota 😂',
    tagColor: 'bg-[#FEECEB] text-[#9E3933] border-[#FBD6D3]',
  },
  {
    id: 'screentime',
    label: 'Screen Time',
    value: 'Classified Information 🤫',
    icon: '🤫',
    secretRemark: 'Ye data NASA aur Apple dono se chhipa ke rakha gaya hai taaki koi behosh na ho jaye 📊',
    tagColor: 'bg-[#F2EDFD] text-[#5B32A3] border-[#E2D5FA]',
  },
  {
    id: 'calling',
    label: 'Phone Call',
    value: 'Call Karne Se Saaf Mana 😂',
    icon: '📵',
    secretRemark: 'Call karne ki galti bhi mat karna, turant bolti hai: "Call mat karo, message karo na!" 🙅‍♀️📵 Pata nahi itna kya sharmaati hai mere se, jaise call uthaya toh aawaz hi kho jayegi! 🙈😂',
    tagColor: 'bg-[#FEF5E7] text-[#9A6216] border-[#FCE6C3]',
  },
  {
    id: 'attitude',
    label: 'Attitude',
    value: 'Premium Edition ✨',
    icon: '✨',
    secretRemark: 'Full 5-star savage aura! Nakhre complimentary hain har interaction ke sath 💅',
    tagColor: 'bg-[#EBF7EE] text-[#246A38] border-[#D1F0D7]',
  },
  {
    id: 'cuteness',
    label: 'Cuteness',
    value: 'Unnecessarily High 🐰',
    icon: '🐰',
    secretRemark: 'Itni cuteness ka legal limit cross ho chuka hai, fine lagna chahiye! 🌸',
    tagColor: 'bg-[#FDEEF5] text-[#9B2A6B] border-[#F8D2E7]',
  },
];

export const PersonalityCardStep: React.FC<PersonalityCardStepProps> = ({ onNext }) => {
  const [activeRemark, setActiveRemark] = useState<string | null>(null);
  const [tappedStats, setTappedStats] = useState<Set<string>>(new Set());

  const handleStatClick = (stat: PersonalityStat) => {
    setActiveRemark(activeRemark === stat.id ? null : stat.id);
    setTappedStats((prev) => new Set(prev).add(stat.id));
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-6">
      {/* Top Scrapbook Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <span className="font-hand text-xl text-[#8C7A6B] inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#B85B43]" /> Dossier Entry #01 · Annu Ka Verified Profile 😂
        </span>
      </motion.div>

      {/* Handcrafted Scrapbook Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-[#FFFDF9] border border-[#E8DFC8] rounded-2xl p-6 sm:p-7 paper-shadow-lg"
      >
        {/* Metal Paperclip top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-7 h-10 border-2 border-[#948B80] rounded-full pointer-events-none opacity-80" />

        {/* Vintage Postal / Dossier Stamp top right */}
        <div className="absolute top-4 right-4 rotate-6 border border-[#B85B43]/40 rounded-lg p-1.5 text-center pointer-events-none select-none">
          <div className="text-[9px] font-mono uppercase tracking-widest text-[#B85B43] font-bold">
            CONFIDENTIAL
          </div>
          <div className="text-[8px] font-mono text-[#8C7A6B]">FILE // ANNU</div>
        </div>

        {/* Card Title */}
        <div className="mb-5 text-left pr-24">
          <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#8C7A6B] bg-[#F5ECE0] px-2 py-0.5 rounded mb-1">
            Subject: Annu ✨
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#332C27] font-body">
            Official Personality Audit
          </h2>
          <p className="font-hand text-lg text-[#7C695C] mt-0.5">
            (Kisi bhi row pe tap karo andar ki baat janne ke liye 🔍)
          </p>
        </div>

        {/* Personality Stats List */}
        <div className="space-y-2.5 mb-6">
          {stats.map((stat, idx) => {
            const isSelected = activeRemark === stat.id;
            const hasBeenTapped = tappedStats.has(stat.id);

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                onClick={() => handleStatClick(stat)}
                className={`group cursor-pointer rounded-xl border p-3 sm:py-3.5 sm:px-4 transition-all duration-200 select-none ${
                  isSelected
                    ? 'bg-[#FBF8F2] border-[#C2AFA1] shadow-sm'
                    : 'bg-[#FFFEFC] border-[#EFE7D8] hover:border-[#D9CAB7] hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </span>
                    <span className="font-medium text-sm text-[#4A3E36] truncate">
                      {stat.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${stat.tagColor}`}
                    >
                      {stat.value}
                    </span>
                    {hasBeenTapped && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6D8A68] opacity-70" />
                    )}
                  </div>
                </div>

                {/* Secret witty commentary on tap */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2.5 pt-2 border-t border-dashed border-[#E3D4C3] flex items-start gap-2 text-xs text-[#5C4D43] font-hand text-base sm:text-lg">
                        <span className="text-[#B85B43] shrink-0 font-bold">↳ Asli Baat:</span>
                        <span>{stat.secretRemark}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Cute hand-written sticky note footnote */}
        <div className="relative bg-[#FEFBF3] border-l-2 border-[#D4A373] p-3 rounded-r-lg mb-6 text-xs text-[#6B5A4E]">
          <span className="font-hand text-lg text-[#40332B] block leading-snug">
            "Audit Report ka final verdict: Calling success rate 0.0%! Reason aaj tak unsolved mystery hai... pakka phone aate hi madam full blush aur sharmaane lagti hain! 🤫🙈😂"
          </span>
        </div>

        {/* Main Action Button (Only 1 primary button as requested!) */}
        <button
          onClick={onNext}
          className="w-full group relative py-3.5 px-6 rounded-xl bg-[#332C27] hover:bg-[#453B34] text-[#FAF7F2] font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
        >
          <span>Wait, abhi aur bhi hai... 👀</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Washi Tape Accent */}
        <div className="absolute -bottom-2.5 left-10 washi-tape-gold w-24 h-5 rotate-1 rounded-sm opacity-80 pointer-events-none" />
      </motion.div>
    </div>
  );
};
