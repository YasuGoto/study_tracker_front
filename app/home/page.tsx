"use client";
import { useState, useEffect } from "react";
import {
  getActiveStudySession,
  startStudySession,
  stopStudySession,
} from "@/lib/study-session/fetch";
import { getDailySummary, createDailySummary } from "@/lib/daily-summary/fetch";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const fetchDailySummary = async () => {
    const response = await createDailySummary();
    if (!response) {
      return;
    }
    return response;
  };
  const fetchTotalTime = async () => {
    try {
      const jstNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
      const jstDate = jstNow.toISOString().split("T")[0];
      const response = await getDailySummary(jstDate);
      if (!response) return;
      setTotalTime(response.totalSeconds ?? 0);
    } catch (error) {}
  };
  const handleStart = async () => {
    const response = await startStudySession();
    if (!response) {
      return;
    }
    setIsActive(true);
  };
  const handleStop = async () => {
    const response = await stopStudySession();
    if (!response) {
      return;
    }
    await fetchDailySummary();
    await fetchTotalTime();
    setIsActive(false);
  };

  useEffect(() => {
    const fetchActiveStudySession = async () => {
      const response = await getActiveStudySession();
      if (!response) {
        setIsActive(false);
        return;
      }
      if (response.stoppedDate) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };
    fetchActiveStudySession();
    fetchTotalTime();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {isActive ? (
        <button onClick={handleStop}>Stop</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <p>Total Time: {totalTime}</p>
    </div>
  );
}
