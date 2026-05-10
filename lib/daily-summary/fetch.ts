import { apiFetch } from "../common/fetch";

type DailySummaryResponse = {
  id: number;
  userId: number;
  date: Date;
  totalSeconds: number;
};

export async function getPeriodSummary(startDate: string, endDate: string) {
  return apiFetch<DailySummaryResponse[]>(
    `/daily-summary/period?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );
}

export async function createDailySummary() {
  return apiFetch<DailySummaryResponse>("/daily-summary", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
}
