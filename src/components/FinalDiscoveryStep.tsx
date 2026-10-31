import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Sparkles, BookOpen, Instagram, Check, Trash2, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlacedSticker } from '../types';

interface FinalDiscoveryStepProps {
  onRestart: () => void;
  onJumpToStep: (step: 'personality' | 'mountain' | 'polaroid') => void;
}

const stickerPalettes = [
  { emoji: '✨', name: 'Sparkle' },
  { emoji: '🌸', name: 'Phool' },
  { emoji: '☕', name: 'Chai' },
  { emoji: '💖', name: 'Cute Dil' },
  { emoji: '🧸', name: 'Teddy' },
  { emoji: '📱', name: 'Reels' },
  { emoji: '⭐', name: 'Taara' },
  { emoji: '🎀', name: 'Bow' },
];

export const FinalDiscoveryStep: React.FC<FinalDiscoveryStepProps> = ({
  onRestart,
  onJumpToStep,
}) => {
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [showIndex, setShowIndex] = useState(false);
  const [lastPlaced, setLastPlaced] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Joyful celebration confetti on entry
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#F4C2C2', '#C5D9C7', '#F6DEB3', '#D4A373', '#B85B43'],
    });

    // Place a couple of welcome stickers automatically so the scrapbook looks alive!
    setStickers([
      { id: 'init-1', emoji: '✨', x: 45, y: 35, rotation: -12, scale: 1 },
      { id: 'init-2', emoji: '💖', x: 280, y: 190, rotation: 15, scale: 1 },
    ]);
  }, []);

  const addSticker = (x: number, y: number, emojiToPlace: string) => {
    const newSticker: PlacedSticker = {
      id: `${Date.now()}-${Math.random()}`,
      emoji: emojiToPlace,
      x,
      y,
      rotation: Math.floor(Math.random() * 36) - 18,
      scale: 1,
    };

    setStickers((prev) => [...prev, newSticker]);
    setLastPlaced(Date.now());
  };

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));

    addSticker(x, y, selectedEmoji);
  };

  const handlePaletteClick = (emoji: string) => {
    setSelectedEmoji(emoji);

    // Also auto-stamp one in a nice spot so the user immediately sees it working!
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const randomX = Math.floor(Math.random() * (rect.width - 80)) + 40;
      const randomY = Math.floor(Math.random() * (rect.height - 80)) + 40;
      addSticker(randomX, randomY, emoji);
    } else {
      addSticker(150, 100, emoji);
    }
  };

  const handleClearStickers = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStickers([]);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-6">
      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <span className="font-hand text-xl text-[#8C7A6B] inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#B85B43]" /> Safar Khatam · Ab smile karo please 😊
        </span>
      </motion.div>

      {/* Handcrafted Scrapbook Final Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-[#FFFDF9] border border-[#E8DFC8] rounded-2xl p-6 sm:p-8 paper-shadow-lg text-center overflow-hidden"
      >
        {/* Top washi tape */}
        <div className="absolute -top-3 left-10 washi-tape-pink w-28 h-6 -rotate-2 rounded-sm opacity-90 pointer-events-none" />
        <div className="absolute -top-3 right-10 washi-tape-gold w-24 h-6 rotate-3 rounded-sm opacity-90 pointer-events-none" />

        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-paper-grid opacity-25 pointer-events-none" />

        {/* Playful Sticker Stamp Canvas Area */}
        <div
          ref={boardRef}
          onClick={handleBoardClick}
          className="relative min-h-[240px] bg-[#FAF5EC]/85 border-2 border-dashed border-[#DFCDB6] rounded-xl p-5 mb-5 cursor-pointer select-none overflow-hidden transition-colors hover:bg-[#F8F2E6]"
          title="Kahin bhi tap karke stickers chipkao!"
        >
          {/* Main required copy in natural Hinglish WhatsApp tone */}
          <div className="relative z-10 max-w-md mx-auto pointer-events-none">
            <div className="w-12 h-12 mx-auto mb-3 bg-[#F2E5D5] rounded-full flex items-center justify-center text-[#B85B43] shadow-sm">
              <Instagram className="w-6 h-6" />
            </div>

            <h3 className="font-hand text-3xl sm:text-4xl text-[#332C27] font-bold leading-tight mb-2">
              Okay Annu, ab wapas jao apni reels pe.
            </h3>

            <p className="font-body text-base sm:text-lg text-[#5C4D43] font-medium leading-relaxed mb-3">
              Tumhara scrolling schedule wait kar raha hoga! 😂
            </p>

            <div className="w-16 h-0.5 bg-[#D9CAB7] mx-auto my-3 rounded-full opacity-60" />

            <p className="font-hand text-2xl sm:text-3xl text-[#7A5B49] leading-snug">
              "Khair, bas thoda sa alag try kiya tha.<br />
              Umeed hai face pe thodi si smile zaroor aayi hogi!" ✨
            </p>
          </div>

          {/* User Placed Stickers - Rendered on TOP (z-30) */}
          <AnimatePresence>
            {stickers.map((st) => (
              <motion.div
                key={st.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                style={{
                  left: st.x,
                  top: st.y,
                  transform: `translate(-50%, -50%) rotate(${st.rotation}deg)`,
                }}
                className="absolute z-30 pointer-events-none text-3xl sm:text-4xl select-none drop-shadow-sm filter"
              >
                {st.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive touch hint inside board */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-body text-[#8C7A6B] z-20 pointer-events-auto">
            <span className="bg-[#FFFDF9]/90 px-2 py-0.5 rounded-md border border-[#E8DFC8] flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#B85B43]" />
              Tap anywhere to stamp {selectedEmoji}!
            </span>

            {stickers.length > 0 && (
              <button
                type="button"
                onClick={handleClearStickers}
                className="bg-[#FFFDF9]/90 px-2 py-0.5 rounded-md border border-[#E8DFC8] text-[#B85B43] hover:bg-[#FDECEB] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Clear ({stickers.length})
              </button>
            )}
          </div>
        </div>

        {/* Sticker Palette Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="text-xs font-hand text-lg text-[#8C7A6B]">Sticker chuno (tap to stamp):</span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {stickerPalettes.map((item) => {
              const isSelected = selectedEmoji === item.emoji;
              return (
                <button
                  key={item.emoji}
                  type="button"
                  onClick={() => handlePaletteClick(item.emoji)}
                  className={`min-w-[42px] h-10 px-2 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBDDCB] scale-110 shadow-sm ring-2 ring-[#B85B43]'
                      : 'bg-[#FAF5EC] hover:bg-[#F2E6D5] border border-[#EAE0D0]'
                  }`}
                  title={`${item.name} chipkao`}
                  aria-label={item.name}
                >
                  <span>{item.emoji}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1 or 2 Main Buttons (Replay and Chapters) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          <button
            onClick={onRestart}
            className="py-3 px-5 rounded-xl bg-[#332C27] hover:bg-[#453B34] text-[#FAF7F2] font-medium text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Wapas Shuru Se Dekho 🔄</span>
          </button>

          <button
            onClick={() => setShowIndex(!showIndex)}
            className="py-3 px-5 rounded-xl bg-[#FAF3E8] hover:bg-[#EFE4D3] text-[#4A3B32] border border-[#DFCFC0] font-medium text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
          >
            <BookOpen className="w-4 h-4 text-[#8C7A6B]" />
            <span>{showIndex ? "Menu Band Karo" : "Pichle Moments Dekho 📖"}</span>
          </button>
        </div>

        {/* Revisit Drawer */}
        <AnimatePresence>
          {showIndex && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-[#EAE0D0] text-left overflow-hidden"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] mb-2 font-body">
                Kisi bhi part pe wapas jao:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onJumpToStep('personality')}
                  className="p-2.5 rounded-lg bg-[#FAF5EB] hover:bg-[#F2E7D6] text-xs font-medium text-[#4A3B32] border border-[#E8DFC8] text-center transition-colors cursor-pointer"
                >
                  <span className="block text-base mb-0.5">📱</span>
                  <span>Personality Audit</span>
                </button>
                <button
                  onClick={() => onJumpToStep('mountain')}
                  className="p-2.5 rounded-lg bg-[#FAF5EB] hover:bg-[#F2E7D6] text-xs font-medium text-[#4A3B32] border border-[#E8DFC8] text-center transition-colors cursor-pointer"
                >
                  <span className="block text-base mb-0.5">🏔️</span>
                  <span>Pahad & Taare</span>
                </button>
                <button
                  onClick={() => onJumpToStep('polaroid')}
                  className="p-2.5 rounded-lg bg-[#FAF5EB] hover:bg-[#F2E7D6] text-xs font-medium text-[#4A3B32] border border-[#E8DFC8] text-center transition-colors cursor-pointer"
                >
                  <span className="block text-base mb-0.5">📸</span>
                  <span>Polaroid Photo</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Washi Tape */}
        <div className="absolute -bottom-2.5 right-10 washi-tape-sage w-24 h-5 rotate-2 rounded-sm opacity-80 pointer-events-none" />
      </motion.div>
    </div>
  );
};
