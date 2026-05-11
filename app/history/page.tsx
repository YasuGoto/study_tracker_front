"use client";
import { useState, useEffect } from "react";
import { getPeriodSummary } from "@/lib/daily-summary/fetch";

type PeriodSummary = {
  date: Date;
  totalSeconds: number;
};

export default function History() {
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
  return <div>History</div>;
}
