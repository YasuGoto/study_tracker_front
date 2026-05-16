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
  const postColor = (totalSeconds: number | undefined): string => {
    if (totalSeconds === undefined) return "#e5e7eb";
    if (totalSeconds > 3600) return "#16a34a";
    if (totalSeconds > 1800) return "#4ade80";
    if (totalSeconds > 600) return "#bbf7d0";
    return "#dcfce7";
  };

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="flex gap-1 overflow-x-auto">
      <div className="flex flex-col gap-1">
        <div className="h-4" />
        {weekLabels.map((label) => (
          <div key={label} className="h-4 text-xs flex items-center">
            {label}
          </div>
        ))}
      </div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          <div className="h-4 text-xs">
            {weekIndex === 0 ||
            week[0].getMonth() !== weeks[weekIndex - 1][0].getMonth()
              ? monthLabels[week[0].getMonth()]
              : ""}
          </div>
          {week.map((day) => (
            <div
              key={day.toISOString()}
              style={{
                backgroundColor: postColor(
                  summaries.find(
                    (summary) =>
                      new Date(
                        new Date(summary.date).getTime() + 9 * 60 * 60 * 1000,
                      )
                        .toISOString()
                        .split("T")[0] === day.toISOString().split("T")[0],
                  )?.totalSeconds,
                ),
              }}
              className="w-4 h-4"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
