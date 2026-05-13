"use client";
import { useState, useEffect } from "react";
import { getPeriodSummary } from "@/lib/daily-summary/fetch";

type PeriodSummary = {
  date: Date;
  totalSeconds: number;
};

export default function History() {
  const MS_PER_DAY = 86_400_000;
  const jstNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  const jstOneYearAgo = new Date(jstNow.getTime() - 365 * 24 * 60 * 60 * 1000);
  const END_DATE = jstNow.toISOString().split("T")[0];
  const START_DATE = jstOneYearAgo.toISOString().split("T")[0];
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

  // 日付の配列を作成
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

  // 色の判定
  const postColor = (totalSeconds: number | undefined) => {
    if (totalSeconds === undefined) return "bg-gray-100";
    if (totalSeconds > 10000) return "bg-green-400";
    if (totalSeconds > 5000) return "bg-green-200";
    if (totalSeconds > 3000) return "bg-green-100";
    return "bg-gray-100";
  };

  return (
    <div className="flex flex-col">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className={postColor(
            summaries.find((summary) => summary.date === day)?.totalSeconds,
          )}
        >
          {day.toISOString()}
        </div>
      ))}
    </div>
  );
}
