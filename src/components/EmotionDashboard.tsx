import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Smile, Frown, Meh, Heart, Brain, ThumbsUp } from "lucide-react";

interface EmotionData {
  emotion: string;
  intensity: number;
  confidence: number;
}

interface EmotionDashboardProps {
  emotions?: EmotionData[];
  currentEmotion?: string;
  speakerName?: string;
}

const defaultEmotions: EmotionData[] = [
  { emotion: "Happy", intensity: 75, confidence: 85 },
  { emotion: "Calm", intensity: 60, confidence: 90 },
  { emotion: "Engaged", intensity: 80, confidence: 75 },
  { emotion: "Neutral", intensity: 40, confidence: 95 },
  { emotion: "Excited", intensity: 65, confidence: 80 },
];

const EmotionDashboard = ({
  emotions = defaultEmotions,
  currentEmotion = "Happy",
  speakerName = "Speaker",
}: EmotionDashboardProps) => {
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
      case "calm":
        return <Brain className="w-6 h-6 text-purple-500" />;
      default:
        return <ThumbsUp className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <Card className="w-[300px] h-[800px] p-4 bg-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Emotion Analysis</h2>
          <div className="flex items-center gap-2">
            {getEmotionIcon(currentEmotion)}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Current Speaker</p>
          <p className="text-lg font-medium">{speakerName}</p>
        </div>

        <Separator className="my-4" />

        <div className="flex-1">
          <h3 className="text-sm font-medium mb-4">Emotional States</h3>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {emotions.map((emotion, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getEmotionIcon(emotion.emotion)}
                      <span className="text-sm font-medium">
                        {emotion.emotion}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {emotion.intensity}%
                    </span>
                  </div>
                  <Progress value={emotion.intensity} className="h-2" />
                  <p className="text-xs text-gray-500 text-right">
                    Confidence: {emotion.confidence}%
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default EmotionDashboard;
