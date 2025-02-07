import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceActionButtonProps {
  isRecording?: boolean;
  isProcessing?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  className?: string;
}

const VoiceActionButton = ({
  isRecording = false,
  isProcessing = false,
  onStartRecording = () => {},
  onStopRecording = () => {},
  className = "",
}: VoiceActionButtonProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn("relative", className)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          className={cn(
            "h-16 w-16 rounded-full shadow-lg",
            isRecording && "animate-pulse",
          )}
          onClick={isRecording ? onStopRecording : onStartRecording}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isRecording ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>

        {isRecording && (
          <motion.div
            className="absolute -inset-2 rounded-full border-4 border-red-500/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceActionButton;
