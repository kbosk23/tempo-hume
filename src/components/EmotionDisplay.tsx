import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Smile, Frown, Meh, Heart, Brain, ThumbsUp } from "lucide-react";
import { Emotion } from "../types/hume";

interface EmotionDisplayProps {
  emotions: Emotion[];
  isRecording: boolean;
}

const EmotionDisplay = ({ emotions, isRecording }: EmotionDisplayProps) => {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happiness":
        return <Smile className="w-6 h-6 text-green-500" />;
      case "sadness":
        return <Frown className="w-6 h-6 text-blue-500" />;
      case "neutral":
        return <Meh className="w-6 h-6 text-gray-500" />;
      case "excitement":
        return <Heart className="w-6 h-6 text-red-500" />;
      case "calmness":
        return <Brain className="w-6 h-6 text-purple-500" />;
      default:
        return <ThumbsUp className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-32 right-8 w-64"
        >
          <Card className="p-4 bg-background/95 backdrop-blur-sm border shadow-lg">
            <h3 className="text-sm font-medium mb-4">Real-time Emotions</h3>
            <div className="space-y-3">
              {emotions.map((emotion, index) => (
                <motion.div
                  key={emotion.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getEmotionIcon(emotion.name)}
                      <span className="text-sm">{emotion.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(emotion.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={emotion.score * 100} className="h-1" />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmotionDisplay;
