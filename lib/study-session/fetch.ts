import { apiFetch } from "../common/fetch";

type StudySessionResponse = {
  id: number;
  userId: number;
  startedDate: Date;
  stoppedDate: Date | null;
  duration: number | null;
};

export async function startStudySession() {
  return apiFetch<StudySessionResponse>("/study-sessions/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
}

export async function stopStudySession() {
  return apiFetch<StudySessionResponse>("/study-sessions/stop", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
}

export async function getActiveStudySession() {
  return apiFetch<StudySessionResponse>("/study-sessions/active", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
}
