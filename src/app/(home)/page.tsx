//app/(home)/page.tsx

"use client";

import { useState, useEffect } from "react";
import IntroHeartCanvas from "@/components/intro";
import Audio from "@/components/audio-playback";
import ClickSpark from "@/components/layout/spark";
import FloatingHearts from "@/components/ui/hearts";
import Content from "@/components/content";
import Story from "@/components/story";
import Photos from "@/components/photosmason";

export default function MonthsaryPage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [showIntro]);

  return (
    <main>
      {!showIntro && (
        <div className="fixed inset-0 z-1 pointer-events-none">
          <FloatingHearts />
        </div>
      )}
      <ClickSpark
        sparkColor="#FFD801"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {showIntro ? (
          <IntroHeartCanvas onFinish={() => setShowIntro(false)} />
        ) : (
          <div className="w-full h-full min-h-screen mx-auto bg-pink-50 text-gray-900 relative">
            <Content />
            <Story />
            <Photos />
          </div>
        )}
        <div className="fixed bottom-4 right-4 z-50">
          <Audio />
        </div>
      </ClickSpark>
    </main>
  );
}
