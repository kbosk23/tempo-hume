import React, { useState, useEffect, useRef } from "react";
import EmotionDisplay from "./EmotionDisplay";
import { Emotion } from "../types/hume";
import { startHumeStream } from "../lib/hume";
import { Button } from "./ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

import { EmotionUpdate } from "../types/hume";

interface VoiceRecorderProps {
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onEmotionUpdate?: (update: EmotionUpdate) => void;
  isRecording?: boolean;
  audioLevel?: number;
  className?: string;
}

const VoiceRecorder = ({
  onStartRecording = () => {},
  onStopRecording = () => {},
  onEmotionUpdate = () => {},
  isRecording = false,
  audioLevel = 0,
  className = "",
}: VoiceRecorderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentEmotions, setCurrentEmotions] = useState<Emotion[]>([]);
  const [stream, setStream] =
    useState<
      ReturnType<typeof startHumeStream> extends Promise<infer T>
        ? T | null
        : never
    >(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const animationFrame = useRef<number>();

  const startAudioProcessing = async () => {
    console.log("Starting audio processing...");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Set up audio analysis
      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(mediaStream);
      source.connect(analyser.current);

      // Set up media recorder
      mediaRecorder.current = new MediaRecorder(mediaStream);
      mediaRecorder.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && stream) {
          // Convert blob to base64
          const buffer = await event.data.arrayBuffer();
          const base64Audio = btoa(
            String.fromCharCode(...new Uint8Array(buffer)),
          );

          // Send to Hume
          stream.send({
            data: {
              audio: base64Audio,
              type: "audio/webm",
            },
          });
        }
      };

      // Start recording
      mediaRecorder.current.start(1000); // Send data every second

      // Start audio level analysis
      const analyzeAudio = () => {
        if (!analyser.current) return;

        const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(dataArray);

        // Calculate average volume level (0-1)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const normalizedLevel = average / 255;

        onStartRecording();
        animationFrame.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };

  const stopAudioProcessing = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
    }

    if (audioContext.current) {
      audioContext.current.close();
    }

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    onStopRecording();
  };

  useEffect(() => {
    console.log("Recording state changed:", isRecording);
    if (isRecording) {
      startHumeStream((update) => {
        setCurrentEmotions(update.emotions);
        onEmotionUpdate(update);
      })
        .then((humeStream) => {
          setStream(humeStream);
          startAudioProcessing();
        })
        .catch(console.error);
    } else {
      stopAudioProcessing();
      if (stream) {
        stream.disconnect();
        setStream(null);
      }
    }
    return () => {
      stopAudioProcessing();
      if (stream) {
        stream.disconnect();
      }
    };
  }, [isRecording]);

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
      <EmotionDisplay emotions={currentEmotions} isRecording={isRecording} />
    </motion.div>
  );
};

export default VoiceRecorder;
