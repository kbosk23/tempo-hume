import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Smile, Frown, Meh, Heart, ThumbsUp, ThumbsDown } from "lucide-react";

interface EmotionData {
  emotion: string;
  intensity: number;
  confidence: number;
}

interface EmotionAnalyticsProps {
  emotions?: EmotionData[];
  currentEmotion?: string;
  speakerName?: string;
}

const EmotionAnalytics = ({
  emotions = [
    { emotion: "Happy", intensity: 75, confidence: 0.85 },
    { emotion: "Neutral", intensity: 45, confidence: 0.65 },
    { emotion: "Excited", intensity: 60, confidence: 0.75 },
    { emotion: "Calm", intensity: 30, confidence: 0.55 },
  ],
  currentEmotion = "Happy",
  speakerName = "Speaker",
}: EmotionAnalyticsProps) => {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return <Smile className="w-6 h-6 text-green-500" />;
      case "sad":
        return <Frown className="w-6 h-6 text-blue-500" />;
      case "neutral":
        return <Meh className="w-6 h-6 text-gray-500" />;
      case "excited":
        return <Heart className="w-6 h-6 text-red-500" />;
      case "positive":
        return <ThumbsUp className="w-6 h-6 text-green-500" />;
      case "negative":
        return <ThumbsDown className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <Card className="w-[300px] h-full bg-white p-4 shadow-lg">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Emotion Analytics</h2>
          <p className="text-sm text-gray-500">
            {speakerName}'s Emotional State
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg">Current Emotion</h3>
            {getEmotionIcon(currentEmotion)}
          </div>
          <p className="text-2xl font-bold">{currentEmotion}</p>
        </div>

        <Separator className="my-4" />

        <ScrollArea className="flex-1">
          <div className="space-y-6">
            {emotions.map((emotion, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getEmotionIcon(emotion.emotion)}
                    <span className="font-medium">{emotion.emotion}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {Math.round(emotion.confidence * 100)}%
                  </span>
                </div>
                <Progress
                  value={emotion.intensity}
                  className="h-2"
                  indicatorClassName={`${
                    emotion.emotion.toLowerCase() === "happy"
                      ? "bg-green-500"
                      : emotion.emotion.toLowerCase() === "sad"
                        ? "bg-blue-500"
                        : emotion.emotion.toLowerCase() === "excited"
                          ? "bg-red-500"
                          : "bg-gray-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <div className="mt-auto pt-4">
          <p className="text-sm text-gray-500 text-center">
            Real-time emotion analysis powered by Hume.ai
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmotionAnalytics;
