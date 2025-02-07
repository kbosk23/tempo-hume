import React, { useState } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface VoiceRecorderProps {
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isRecording?: boolean;
  audioLevel?: number;
  className?: string;
}

const VoiceRecorder = ({
  onStartRecording = () => {},
  onStopRecording = () => {},
  isRecording = false,
  audioLevel = 0,
  className = "",
}: VoiceRecorderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("fixed bottom-8 right-8 bg-background", className)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        size="lg"
        variant="default"
        className="h-16 w-16 rounded-full relative"
        onClick={isRecording ? onStopRecording : onStartRecording}
      >
        {isRecording ? (
          <>
            <MicOff className="h-6 w-6 text-destructive" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1 }}
              animate={{
                scale: 1 + audioLevel * 0.5,
                opacity: 0.2,
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            />
          </>
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>

      {isRecording && (
        <motion.div
          className="absolute -top-2 -right-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
        </motion.div>
      )}

      {isHovered && !isRecording && (
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Click to start recording
        </motion.div>
      )}
    </motion.div>
  );
};

export default VoiceRecorder;
