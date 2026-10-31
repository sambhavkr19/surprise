import React, { useEffect, useState, useRef } from 'react';
import { musicManager } from '../utils/audio';
import { Volume2, VolumeX, Play, Pause, Upload, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [trackName, setTrackName] = useState("Naaraazgi 🎵");
  const [isCustom, setIsCustom] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = musicManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setTrackName(state.trackName);
      setIsCustom(state.isCustom);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    musicManager.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    musicManager.setVolume(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      musicManager.loadCustomFile(file);
    }
  };

  return (
    <div className="relative z-50">
      {/* Floating Paper Audio Player Pill */}
      <div className="flex items-center gap-2 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8DFC8] shadow-sm hover:shadow transition-all text-xs font-body text-[#5C4D43]">
        <button
          onClick={handleToggle}
          className="flex items-center gap-1.5 hover:text-[#B85B43] transition-colors focus-visible:outline-none"
          title={isPlaying ? "Gaana roko" : "Naaraazgi bajao"}
          aria-label={isPlaying ? "Pause music" : "Play Naaraazgi"}
        >
          {isPlaying ? (
            <div className="w-6 h-6 rounded-full bg-[#EAD8C7] flex items-center justify-center text-[#5C4D43]">
              <Pause className="w-3.5 h-3.5 fill-current" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#EAD8C7] flex items-center justify-center text-[#5C4D43]">
              <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
            </div>
          )}
          <span className="font-medium tracking-tight text-[11px] max-w-[120px] truncate sm:max-w-[160px]">
            {trackName}
          </span>
        </button>

        {/* Animated Sound Wave Bars when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 h-3 px-1" aria-hidden="true">
            <span className="w-0.5 bg-[#B85B43] h-2 animate-pulse rounded-full" />
            <span className="w-0.5 bg-[#B85B43] h-3.5 animate-pulse delay-75 rounded-full" />
            <span className="w-0.5 bg-[#B85B43] h-2.5 animate-pulse delay-150 rounded-full" />
          </div>
        )}

        {/* Volume popover toggle / controls */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-1 text-[#8C7A6B] hover:text-[#332C27] rounded transition-colors"
          title="Audio settings & song upload"
          aria-label="Audio settings"
        >
          {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Hidden File Input for Naaraazgi.mp3 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1 text-[#8C7A6B] hover:text-[#B85B43] rounded transition-colors"
          title="Apna naarajgi.mp3 gaana yahan upload karo"
          aria-label="Upload audio"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Audio Tray */}
      {showControls && (
        <div className="absolute right-0 top-10 mt-1 w-60 p-3 bg-[#FFFDF9] rounded-xl border border-[#E8DFC8] paper-shadow text-xs text-[#5C4D43] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#8C7A6B] flex items-center gap-1">
              <Music className="w-3 h-3" /> Aawaaz
            </span>
            <span className="text-[11px] font-mono text-[#8C7A6B]">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#B85B43] cursor-pointer h-1.5 bg-[#EFE6D8] rounded-lg"
          />

          <div className="mt-3 pt-2 border-t border-[#EFE6D8] flex flex-col gap-1.5">
            <div className="text-[11px] text-[#8C7A6B] leading-relaxed">
              {isCustom ? "Custom gaana chal raha hai ✨" : "Soothing acoustic Naaraazgi melody baj rahi hai. naarajgi.mp3 upload bhi kar sakti ho!"}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 w-full py-1.5 px-2 bg-[#F5ECE0] hover:bg-[#EBDDCB] text-[#5C4D43] rounded-lg font-medium text-[11px] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3 h-3" /> naarajgi.mp3 upload karo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
