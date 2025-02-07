export interface Emotion {
  name: string;
  score: number;
}

export interface EmotionUpdate {
  emotions: Emotion[];
  timestamp: number;
}
