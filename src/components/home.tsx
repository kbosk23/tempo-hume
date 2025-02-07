import React from "react";
import ChatInterface from "./ChatInterface";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Reading Road EVI Logo"
            className="h-12 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Reading Road EVI
            </h1>
            <p className="text-muted-foreground">
              Emotional Voice Interface for Reading Assessment
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Home;
