"use client";
import { useState, useEffect } from "react";
import { getActiveStudySession } from "@/lib/study-session/fetch";
import { getDailySummary } from "@/lib/daily-summary/fetch";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

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
    const fetchTotalTime = async () => {
      const response = await getDailySummary(
        new Date().toISOString().split("T")[0],
      );
      setTotalTime(response.totalSeconds ?? 0);
    };
    fetchActiveStudySession();
    fetchTotalTime();
  }, []);
}
