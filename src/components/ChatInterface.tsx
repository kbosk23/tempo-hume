import React, { useState } from "react";
import MessageWindow from "./chat/MessageWindow";
import VoiceActionButton from "./chat/VoiceActionButton";
import TranscriptionDisplay from "./chat/TranscriptionDisplay";
import EmotionAnalytics from "./chat/EmotionAnalytics";

interface ChatInterfaceProps {
  className?: string;
  onVoiceInput?: (audio: Blob) => Promise<void>;
  onMessageSend?: (message: string) => Promise<void>;
}

const ChatInterface = ({
  className = "",
  onVoiceInput = async () => {},
  onMessageSend = async () => {},
}: ChatInterfaceProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscription("Listening...");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setTranscription("");
    }, 2000);
  };

  return (
    <div className={`flex h-screen bg-gray-100 p-6 gap-6 ${className}`}>
      <div className="flex-1 flex flex-col gap-6">
        <MessageWindow
          messages={[
            {
              id: "1",
              text: "Hello! How can I help you today?",
              sender: "ai",
              emotion: "happy",
              timestamp: new Date(),
            },
            {
              id: "2",
              text: "I have a question about my account.",
              sender: "user",
              emotion: "neutral",
              timestamp: new Date(),
            },
          ]}
          className="flex-1"
        />

        <div className="flex justify-center items-center h-24 relative">
          <VoiceActionButton
            isRecording={isRecording}
            isProcessing={isProcessing}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />

          <TranscriptionDisplay
            text={transcription}
            isVisible={isRecording || isProcessing}
          />
        </div>
      </div>

      <EmotionAnalytics
        emotions={[
          { emotion: "Happy", intensity: 75, confidence: 0.85 },
          { emotion: "Neutral", intensity: 45, confidence: 0.65 },
          { emotion: "Excited", intensity: 60, confidence: 0.75 },
          { emotion: "Calm", intensity: 30, confidence: 0.55 },
        ]}
        currentEmotion="Happy"
        speakerName="Current Speaker"
      />
    </div>
  );
};

export default ChatInterface;
