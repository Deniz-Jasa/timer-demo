"use client"
import * as React from "react";
import Countdown from "@/components/Countdown";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [settings, setSettings] = React.useState({
    startDate: new Date(),
    timeLimit: 10,
    extraTime: 0
  });

  return (
    <>
      <Navbar setSettings={setSettings} />
      <div className="flex justify-center items-center min-h-screen">
        <Countdown startingMinutes={settings.timeLimit} extraTimeMinutes={settings.extraTime} startDate={settings.startDate} />
      </div>
    </>
  );
}
