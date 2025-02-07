import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/card";

interface TranscriptionDisplayProps {
  text?: string;
  isVisible?: boolean;
  className?: string;
}

const TranscriptionDisplay = ({
  text = "Listening...",
  isVisible = true,
  className = "",
}: TranscriptionDisplayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg w-[600px] h-[80px] flex items-center justify-center p-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-gray-700 text-center"
            >
              {text}
            </motion.p>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranscriptionDisplay;
