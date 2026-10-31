export type Step = 'envelope' | 'personality' | 'mountain' | 'polaroid' | 'final';

export interface PersonalityStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  secretRemark: string;
  tagColor: string;
}

export interface PlacedSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
