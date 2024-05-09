"use client"
import React, { useState } from 'react';
import Countdown from "@/components/Countdown";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [settings, setSettings] = useState({
    startDate: new Date(),
    timeLimit: 10,
    extraTime: 0
  });

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }

  return (
    <>
      <Navbar setSettings={setSettings} toggleMute={toggleMute} isMuted={isMuted} />
      <div className="flex justify-center items-center min-h-screen">
        <Countdown startingMinutes={settings.timeLimit} extraTimeMinutes={settings.extraTime} startDate={settings.startDate} mutedState={isMuted} />
      </div>
    </>
  );
}