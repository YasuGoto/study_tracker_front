"use client";
import { useState, useEffect } from "react";
import { getPeriodSummary } from "@/lib/daily-summary/fetch";

type PeriodSummary = {
  date: Date;
  totalSeconds: number;
};

export default function History() {
  const MS_PER_DAY = 86_400_000;
  const START_DATE = "2026-01-01";
  const END_DATE = "2026-05-11";
  const [summaries, setSummaries] = useState<PeriodSummary[]>([]);
  useEffect(() => {
    const fetchSummaries = async () => {
      const summaries = await getPeriodSummary(START_DATE, END_DATE);
      if (!summaries) return;
      setSummaries(
        summaries.map((summary) => ({
          date: summary.date,
          totalSeconds: summary.totalSeconds,
        })),
      );
    };
    fetchSummaries();
  }, []);
  const days = [];

  const diffDays = Math.round(
    (new Date(END_DATE).getTime() - new Date(START_DATE).getTime()) /
      MS_PER_DAY,
  );
  const inclusiveDays = diffDays + 1;

  for (let i = 0; i < inclusiveDays; i++) {
    const date = new Date(new Date(START_DATE).getTime() + i * MS_PER_DAY);
    days.push(date);
  }

  return <div>History</div>;
}
