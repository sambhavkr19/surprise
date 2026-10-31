/**
 * Audio manager for Annu's Little Corner
 * Configured with the official Naaraazgi song from Lucky Baskhar.
 * Provides:
 * 1. Immediate autoplay on page load or on first user touch/click
 * 2. Continuous playback across all steps without resetting
 * 3. Minimal controls and volume adjustment
 */

const DEFAULT_SONG_URL = '/naaraazgi.mp3';

class MusicManager {
  private audio: HTMLAudioElement | null = null;
  private volume = 0.75;
  private isPlaying = false;
  private isCustomTrack = false;
  private hasInitialized = false;
  private listeners: Set<(state: { isPlaying: boolean; volume: number; trackName: string; isCustom: boolean }) => void> = new Set();
  public trackName = "Naaraazgi 🎵";

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.hasInitialized) return;
    this.hasInitialized = true;

    this.audio = new Audio(DEFAULT_SONG_URL);
    this.audio.loop = true;
    this.audio.volume = this.volume;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    // Auto-attempt playback immediately on load
    this.attemptAutoplay();

    // In case browser policy blocks un-interacted autoplay, start on first gesture anywhere
    const startOnInteraction = () => {
      if (!this.isPlaying) {
        this.play().then((success) => {
          if (success) {
            removeInteractionListeners();
          }
        });
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('click', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
    };

    window.addEventListener('pointerdown', startOnInteraction, { once: false, passive: true });
    window.addEventListener('click', startOnInteraction, { once: false, passive: true });
    window.addEventListener('touchstart', startOnInteraction, { once: false, passive: true });
    window.addEventListener('keydown', startOnInteraction, { once: false, passive: true });
  }

  public async attemptAutoplay() {
    try {
      if (this.audio) {
        const promise = this.audio.play();
        if (promise !== undefined) {
          await promise;
          this.isPlaying = true;
          this.notify();
        }
      }
    } catch {
      // Browser blocked silent autoplay until user touch; the interaction listeners will catch it
      this.isPlaying = false;
      this.notify();
    }
  }

  public subscribe(listener: (state: { isPlaying: boolean; volume: number; trackName: string; isCustom: boolean }) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      trackName: this.trackName,
      isCustom: this.isCustomTrack,
    };
  }

  public async play(): Promise<boolean> {
    try {
      if (!this.audio) {
        this.initAudio();
      }
      if (this.audio) {
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Audio play prevented:", err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  public loadCustomFile(file: File) {
    const objectUrl = URL.createObjectURL(file);
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.loop = true;
    }
    this.audio.src = objectUrl;
    this.audio.volume = this.volume;
    this.isCustomTrack = true;
    this.trackName = file.name.replace(/\.[^/.]+$/, "") + " 🎵";
    this.play();
  }
}

export const musicManager = new MusicManager();
