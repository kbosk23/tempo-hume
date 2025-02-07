import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Smile, Frown, Meh } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  emotion?: "happy" | "sad" | "neutral";
  timestamp: Date;
}

interface MessageWindowProps {
  messages?: Message[];
  className?: string;
}

const MessageWindow = ({
  messages = [
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
  ],
  className = "",
}: MessageWindowProps) => {
  const getEmotionIcon = (emotion?: "happy" | "sad" | "neutral") => {
    switch (emotion) {
      case "happy":
        return <Smile className="w-4 h-4 text-green-500" />;
      case "sad":
        return <Frown className="w-4 h-4 text-red-500" />;
      case "neutral":
      default:
        return <Meh className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className={`w-full h-[600px] bg-white ${className}`}>
      <ScrollArea className="h-full p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="w-8 h-8">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  {message.sender === "user" ? "U" : "A"}
                </div>
              </Avatar>
              <div
                className={`flex flex-col max-w-[70%] ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{message.text}</span>
                    {message.emotion && getEmotionIcon(message.emotion)}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessageWindow;
