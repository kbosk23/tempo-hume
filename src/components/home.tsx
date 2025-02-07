import React from "react";
import ChatInterface from "./ChatInterface";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Voice Chat Interface
        </h1>
        <p className="text-muted-foreground">
          Interact through voice or text with real-time emotion analysis
        </p>
      </header>

      <main className="container mx-auto max-w-7xl">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Home;
