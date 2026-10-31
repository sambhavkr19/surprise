import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Trash2, RotateCw, Heart, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface PolaroidStepProps {
  onNext: () => void;
}

export const PolaroidStep: React.FC<PolaroidStepProps> = ({ onNext }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [doodleHearts, setDoodleHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved photo from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('annu_polaroid_photo');
      if (saved) setPhotoUrl(saved);
    } catch {
      // ignore
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        try {
          localStorage.setItem('annu_polaroid_photo', result);
        } catch {
          // ignore
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    try {
      localStorage.removeItem('annu_polaroid_photo');
    } catch {
      // ignore
    }
  };

  const addDoodleHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDoodleHearts((prev) => [...prev.slice(-6), { id: Date.now(), x, y }]);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-6">
      {/* Top Scrapbook Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <span className="font-hand text-xl text-[#8C7A6B] inline-flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-[#B85B43]" /> Personal Archive · Annu Ka Special Frame 📸
        </span>
      </motion.div>

      {/* Polaroid Container with Realistic Scrapbook Shadow */}
      <div className="relative w-full max-w-sm perspective-1000 mb-6">
        {/* Top Washi Tape Strip */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 washi-tape-pink w-32 h-6 -rotate-1 rounded-sm opacity-90 shadow-sm pointer-events-none" />

        {/* Flippable Polaroid Body */}
        <motion.div
          initial={{ opacity: 0, rotate: -2, y: 15 }}
          animate={{ opacity: 1, rotate: isFlipped ? 2 : -1.5, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white border border-[#E8DFC8] rounded-xl p-4 pb-6 polaroid-shadow transition-transform cursor-default select-none"
          onClick={addDoodleHeart}
        >
          {/* Subtle Paper Grain */}
          <div className="absolute inset-0 bg-paper-dots opacity-20 pointer-events-none rounded-xl" />

          {/* Doodled Hearts dropped by tapping */}
          {doodleHearts.map((heart) => (
            <span
              key={heart.id}
              style={{ left: heart.x, top: heart.y }}
              className="absolute pointer-events-none text-red-400 font-hand text-xl -translate-x-1/2 -translate-y-1/2 animate-ping duration-700"
            >
              ❤️
            </span>
          ))}

          {!isFlipped ? (
            /* Front of Polaroid */
            <div>
              {/* Photo Viewport */}
              <div className="relative w-full aspect-square bg-[#F7F2E9] rounded-lg overflow-hidden border border-[#ECE2D0] flex flex-col items-center justify-center text-center group">
                <img
                  src={photoUrl || '/annu_girl_portrait.jpg'}
                  alt="Annu's portrait polaroid"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Photo Action Overlay (Upload / Change) */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="flex items-center gap-1 text-[11px] text-white hover:text-yellow-200 transition-colors cursor-pointer"
                    title={photoUrl ? "Photo change karo" : "Apni real photo upload karo"}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{photoUrl ? "Change" : "Upload Photo"}</span>
                  </button>
                  {photoUrl && (
                    <button
                      onClick={handleRemovePhoto}
                      className="p-1 text-white hover:text-red-300 transition-colors cursor-pointer"
                      title="Default portrait par reset karo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Handwritten Captions Below Photo */}
              <div className="mt-4 px-1 text-center">
                <p className="font-hand text-2xl sm:text-3xl text-[#332C27] font-semibold leading-tight tracking-tight">
                  Exhibit A: Samaj ke liye khatra <span className="text-[#B85B43]">(par pyari wali)</span> 📸
                </p>
                <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-hand text-lg mt-2 pt-1 border-t border-dashed border-[#E3D6C5]">
                  <span>Candid Rating: 10/10 ✨</span>
                  <span className="text-[#C45E45] font-script text-2xl">~ Certified Heroine</span>
                </div>
              </div>
            </div>
          ) : (
            /* Back of Polaroid (Handwritten Journal Notes in Hinglish) */
            <div className="min-h-[340px] flex flex-col justify-between p-3 text-left">
              <div>
                <div className="flex items-center justify-between border-b border-[#EADFCB] pb-2 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A6B]">
                    ARCHIVAL NOTE
                  </span>
                  <span className="text-xs font-hand text-[#B85B43]">Oct 2026 ✦</span>
                </div>
                <div className="space-y-3 font-hand text-xl text-[#4A3B32] leading-snug">
                  <p>• <span className="font-bold">Subject:</span> Annu</p>
                  <p>• <span className="font-bold">Location:</span> Phone screen pe chipki hui, memes pe hasti hui</p>
                  <p>• <span className="font-bold">Superpower:</span> Kisi bhi boring din ko fun bana dena</p>
                  <p>• <span className="font-bold">Verdict:</span> Is photo aur smile ko sambhal ke rakhna!</p>
                </div>
              </div>

              <div className="pt-3 border-t border-dashed border-[#EADFCB] text-center font-hand text-lg text-[#8C7A6B]">
                (Dubara tap karke photo ka front dekho)
              </div>
            </div>
          )}

          {/* Flip Card Button */}
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
              className="py-1 px-3 bg-[#FAF5EC] hover:bg-[#EFE5D4] text-[#6B5A4E] rounded-full text-xs font-body flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3 h-3" />
              <span>{isFlipped ? "Photo Dekho" : "Peeche likha note padho ✍️"}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Primary Action Button (Only 1 primary button as requested!) */}
      <button
        onClick={onNext}
        className="w-full max-w-sm group relative py-3.5 px-6 rounded-xl bg-[#332C27] hover:bg-[#453B34] text-[#FAF7F2] font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none"
      >
        <span>Bas ek aakhri cheez... 💌</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Helper text */}
      <p className="mt-3 text-xs text-[#8C7A6B] font-body text-center">
        Tip: Annu ki photo yahan upload kar sakti ho, ya polaroid pe tap karke hearts barasao! ❤️
      </p>
    </div>
  );
};
