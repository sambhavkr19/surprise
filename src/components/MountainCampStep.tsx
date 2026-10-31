import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Flame, Moon, Tent, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MountainCampStepProps {
  onNext: () => void;
}

interface StarCoord {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  label: string;
}

const starryPoints: StarCoord[] = [
  { id: 1, x: 22, y: 14, size: 16, label: "Star of Serenity" },
  { id: 2, x: 42, y: 12, size: 18, label: "Star of Cozy Dreams" },
  { id: 3, x: 62, y: 16, size: 20, label: "Star of Peace" },
  { id: 4, x: 80, y: 13, size: 18, label: "Star of Adventures" },
  { id: 5, x: 34, y: 22, size: 15, label: "Star of Sweet Memories" },
];

export const MountainCampStep: React.FC<MountainCampStepProps> = ({ onNext }) => {
  const [clickedStars, setClickedStars] = useState<Set<number>>(new Set());
  const [showSecretNote, setShowSecretNote] = useState(false);
  const [shootingStarActive, setShootingStarActive] = useState(false);
  const [campfirePoked, setCampfirePoked] = useState(false);
  const [tentGlow, setTentGlow] = useState(true);

  const handleStarClick = (star: StarCoord) => {
    const updated = new Set(clickedStars);
    updated.add(star.id);
    setClickedStars(updated);

    // Trigger shooting star streak
    setShootingStarActive(true);
    setTimeout(() => setShootingStarActive(false), 1200);

    // Trigger soft glitter confetti if she clicked multiple or all
    if (updated.size >= 2) {
      setShowSecretNote(true);
    }
    if (updated.size === starryPoints.length) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#FDE047', '#FEF08A', '#BAE6FD'],
      });
    }
  };

  const handleCampfireClick = () => {
    setCampfirePoked(true);
    setTimeout(() => setCampfirePoked(false), 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-6">
      {/* Top Scrapbook Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <span className="font-hand text-xl text-[#8C7A6B] inline-flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#436B56]" /> Discovery #02 · Thoda Sukoon & Pahad 🏔️
        </span>
      </motion.div>

      {/* Main Art & Exploration Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full bg-[#FFFDF9] border border-[#E3D9C9] rounded-2xl p-4 sm:p-5 paper-shadow-lg overflow-hidden"
      >
        {/* Top washi tape */}
        <div className="absolute -top-3 left-12 z-20 washi-tape-sage w-28 h-5 -rotate-2 rounded-sm opacity-85 pointer-events-none" />

        {/* Interactive Mountain Canvas Frame */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-[#DCD0BE] shadow-inner bg-[#1A2535] group select-none">
          {/* Watercolor Mountain Art */}
          <img
            src="/src/assets/images/mountain_camp_art_1793448482656.jpg"
            alt="Cozy camping tent in mountains under starry sky"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Interactive Star Layer with Glowing Hitboxes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Draw Constellation Lines when stars are clicked */}
            {clickedStars.size > 1 && (
              <polyline
                points="22%,14% 34%,22% 42%,12% 62%,16% 80%,13%"
                fill="none"
                stroke="rgba(253, 224, 71, 0.75)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Clickable Stars */}
          {starryPoints.map((star) => {
            const isClicked = clickedStars.has(star.id);
            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer group/star focus-visible:outline-none"
                title="Is taare pe tap karo ✨"
                aria-label={`Star at ${star.x}%`}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                    isClicked
                      ? 'w-4 h-4 bg-yellow-200 ring-4 ring-yellow-300/40 shadow-[0_0_15px_#FDE047]'
                      : 'w-3 h-3 bg-white/80 group-hover/star:bg-yellow-100 group-hover/star:scale-125 group-hover/star:shadow-[0_0_10px_#FFF]'
                  }`}
                >
                  <span className="text-[10px] text-yellow-500 font-bold select-none">✦</span>
                </div>
              </button>
            );
          })}

          {/* Shooting Star Animation */}
          {shootingStarActive && (
            <div className="absolute top-8 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-200 to-white -rotate-12 animate-ping z-30 pointer-events-none" />
          )}

          {/* Clickable Campfire interactive zone */}
          <button
            onClick={handleCampfireClick}
            className="absolute bottom-[24%] left-[58%] -translate-x-1/2 min-w-[50px] min-h-[50px] z-20 flex items-center justify-center cursor-pointer group/fire focus-visible:outline-none"
            title="Campfire pe tap karo 🔥"
            aria-label="Poke the campfire"
          >
            {campfirePoked && (
              <div className="absolute -top-6 text-yellow-300 text-xs font-hand animate-bounce">
                *mast aag ki garmi* 🔥
              </div>
            )}
          </button>

          {/* Clickable Tent interactive zone */}
          <button
            onClick={() => setTentGlow(!tentGlow)}
            className="absolute bottom-[28%] left-[40%] -translate-x-1/2 min-w-[70px] min-h-[60px] z-20 flex items-center justify-center cursor-pointer focus-visible:outline-none"
            title="Cozy tent ki light 🏮"
            aria-label="Toggle lantern"
          />

          {/* Interactive hint tag inside illustration */}
          <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-hand text-white/90 flex items-center gap-1.5 border border-white/20">
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            <span>Aasman ke taaron pe click karo!</span>
          </div>

          {/* Stars caught counter */}
          <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-body text-white/90 flex items-center gap-1 border border-white/20">
            <span>⭐ {clickedStars.size} / 5 taare</span>
          </div>
        </div>

        {/* Hidden Stargazer Discovery Message (Unlocks on star clicks) */}
        <AnimatePresence>
          {showSecretNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-[#FAF4EB] border border-[#E8DFC8] rounded-xl p-3.5 sm:p-4 paper-shadow text-left flex items-start gap-3">
                <span className="text-2xl shrink-0">✨</span>
                <div>
                  <h4 className="text-xs font-bold font-body uppercase tracking-wider text-[#436B56]">
                    Secret Stargazer Note Khul Gaya!
                  </h4>
                  <p className="font-hand text-xl text-[#332C27] mt-1 leading-snug">
                    "Ek gehri saans lo Annu. Pahad kahin bhaag nahi rahe aur na hi tumhara sukoon. Jab bhi life thodi noisy ya exhausting lage, yaad rakhna ek shaant sa kona hamesha tumhare liye yahan hai."
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Poetic Quote Required by Prompt (Hinglish touch) */}
        <div className="my-5 px-3 py-2 text-center">
          <blockquote className="font-hand text-2xl sm:text-3xl text-[#4A3B32] leading-snug">
            "Kuch logon ko unlimited WiFi chahiye hota hai...<br />
            Aur kuch ko bas pahad, thandi hawa aur ek shaant raat. 🏔️"
          </blockquote>
          <p className="text-xs font-body text-[#8C7A6B] mt-2 italic">
            — Hamari pro reel scroller ke liye ek pyara sa reminder
          </p>
        </div>

        {/* Primary Action Button (Only 1 primary button) */}
        <button
          onClick={onNext}
          className="w-full group relative py-3.5 px-6 rounded-xl bg-[#332C27] hover:bg-[#453B34] text-[#FAF7F2] font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
        >
          <span>Agla panna palto 🌿</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
