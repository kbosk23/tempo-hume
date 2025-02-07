import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Smile, Frown, Meh } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  emotion: "happy" | "sad" | "neutral";
  avatarUrl?: string;
};

interface MessageListProps {
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: "1",
    text: "Hello! How are you today?",
    sender: "AI Assistant",
    timestamp: "10:00 AM",
    emotion: "happy",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai",
  },
  {
    id: "2",
    text: "I'm doing well, thanks for asking!",
    sender: "User",
    timestamp: "10:01 AM",
    emotion: "neutral",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  },
  {
    id: "3",
    text: "That's great to hear!",
    sender: "AI Assistant",
    timestamp: "10:02 AM",
    emotion: "happy",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai2",
  },
];

const EmotionIcon = ({ emotion }: { emotion: Message["emotion"] }) => {
  switch (emotion) {
    case "happy":
      return <Smile className="w-4 h-4 text-green-500" />;
    case "sad":
      return <Frown className="w-4 h-4 text-red-500" />;
    case "neutral":
      return <Meh className="w-4 h-4 text-yellow-500" />;
  }
};

const MessageList = ({ messages = defaultMessages }: MessageListProps) => {
  return (
    <Card className="w-full h-[600px] bg-white border rounded-lg shadow-sm">
      <ScrollArea className="h-full p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === "User" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <img
                  src={message.avatarUrl}
                  alt={message.sender}
                  className="w-full h-full rounded-full"
                />
              </Avatar>
              <div
                className={`flex flex-col max-w-[70%] ${
                  message.sender === "User" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600">
                    {message.sender}
                  </span>
                  <EmotionIcon emotion={message.emotion} />
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessageList;
