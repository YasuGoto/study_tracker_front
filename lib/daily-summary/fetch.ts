import { apiFetch } from "../common/fetch";

type DailySummaryResponse = {
  id: number;
  userId: number;
  date: Date;
  totalSeconds: number;
};

export async function getDailySummary(date: string) {
  return apiFetch<DailySummaryResponse>(`/daily-summary/${date}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
}

export async function createDailySummary() {
  return apiFetch<DailySummaryResponse>("/daily-summary", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
}
