import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";

interface TranscriptionOverlayProps {
  isVisible?: boolean;
  text?: string;
}

const TranscriptionOverlay = ({
  isVisible = true,
  text = "Recording... Please speak now...",
}: TranscriptionOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Card className="bg-background/80 backdrop-blur-sm border-none shadow-lg p-6 w-[600px] max-w-[90vw]">
            <motion.div
              className="flex items-center justify-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <p className="text-foreground/90 text-lg font-medium">{text}</p>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranscriptionOverlay;
