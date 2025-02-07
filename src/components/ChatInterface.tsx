import React, { useState } from "react";
import MessageList from "./MessageList";
import VoiceRecorder from "./VoiceRecorder";
import EmotionDashboard from "./EmotionDashboard";
import TranscriptionOverlay from "./TranscriptionOverlay";

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isRecording?: boolean;
  audioLevel?: number;
  transcriptionText?: string;
}

const ChatInterface = ({
  onSendMessage = () => {},
  onStartRecording = () => {},
  onStopRecording = () => {},
  isRecording = false,
  audioLevel = 0,
  transcriptionText = "",
}: ChatInterfaceProps) => {
  const [showTranscription, setShowTranscription] = useState(false);

  const handleStartRecording = () => {
    setShowTranscription(true);
    onStartRecording();
  };

  const handleStopRecording = () => {
    setShowTranscription(false);
    onStopRecording();
  };

  return (
    <div className="flex w-full h-[800px] bg-gray-50 p-6 gap-6">
      <div className="flex-1 relative">
        <MessageList />
        <VoiceRecorder
          isRecording={isRecording}
          audioLevel={audioLevel}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          className="absolute bottom-8 right-8"
        />
        <TranscriptionOverlay
          isVisible={showTranscription}
          text={transcriptionText}
        />
      </div>
      <EmotionDashboard />
    </div>
  );
};

export default ChatInterface;
