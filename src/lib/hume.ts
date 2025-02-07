// Initialize WebSocket connection to Hume
const HUME_API_KEY = import.meta.env.VITE_HUME_API_KEY || "";
const HUME_CONFIG_ID = import.meta.env.VITE_HUME_CONFIG_ID || "";
const HUME_WS_URL = `wss://api.hume.ai/v0/stream/models`;

import { EmotionUpdate } from "../types/hume";

interface HumeStream {
  disconnect: () => void;
  send: (data: any) => void;
  onEmotionUpdate?: (update: EmotionUpdate) => void;
}

export const startHumeStream = async (
  onEmotionUpdate?: (update: EmotionUpdate) => void,
): Promise<HumeStream> => {
  try {
    const ws = new WebSocket(HUME_WS_URL);

    const stream = {
      disconnect: () => {
        ws.close();
      },
      send: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    await new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log("WebSocket connected to Hume");
        // Send configuration message
        ws.send(
          JSON.stringify({
            token: HUME_API_KEY,
            models: {
              prosody: {
                identify_speakers: false,
                granularity: "word",
                window_sizes: [4],
                output_features: true,
              },
            },
            raw_text: true,
          }),
        );
        resolve(undefined);
      };

      ws.onerror = (error) => {
        reject(error);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Extract emotions from Hume's response
          if (data.prosody && data.prosody.predictions) {
            const emotions = data.prosody.predictions[0].emotions
              .sort((a: any, b: any) => b.score - a.score)
              .slice(0, 4)
              .map((e: any) => ({
                name: e.name,
                score: e.score,
              }));

            const update: EmotionUpdate = {
              emotions,
              timestamp: Date.now(),
            };

            onEmotionUpdate?.(update);
          }
        } catch (error) {
          console.error("Error parsing Hume message:", error);
        }
      };
    });

    return stream;
  } catch (error) {
    console.error("Error connecting to Hume:", error);
    throw error;
  }
};
