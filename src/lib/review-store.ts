import { ReviewStatus, UserReport, ReportType } from "@/types/fiqh";

const STORAGE_KEY = "muminaat_reviews";
const REPORTS_KEY = "muminaat_reports";

interface ReviewData {
  status: ReviewStatus;
  reviewedBy: string | null;
  reviewDate: string | null;
  reviewNotes: string | null;
}

interface StoredReviews {
  [questionId: string]: ReviewData;
}

function getStoredReviews(): StoredReviews {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveStoredReviews(reviews: StoredReviews) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function getStoredReports(): UserReport[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredReports(reports: UserReport[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function getReviewStatus(questionId: string): ReviewStatus {
  const reviews = getStoredReviews();
  return reviews[questionId]?.status ?? "unreviewed";
}

export function getReviewData(questionId: string): ReviewData {
  const reviews = getStoredReviews();
  return reviews[questionId] ?? {
    status: "unreviewed",
    reviewedBy: null,
    reviewDate: null,
    reviewNotes: null,
  };
}

export function setReviewStatus(
  questionId: string,
  status: ReviewStatus,
  reviewedBy?: string,
  reviewNotes?: string,
) {
  const reviews = getStoredReviews();
  reviews[questionId] = {
    status,
    reviewedBy: reviewedBy ?? reviews[questionId]?.reviewedBy ?? null,
    reviewDate: new Date().toISOString(),
    reviewNotes: reviewNotes ?? reviews[questionId]?.reviewNotes ?? null,
  };
  saveStoredReviews(reviews);
}

export function addReport(
  questionId: string,
  type: ReportType,
  description: string,
): UserReport {
  const reports = getStoredReports();
  const report: UserReport = {
    type,
    description,
    date: new Date().toISOString(),
    status: "pending",
    questionId,
  };
  reports.push(report);
  saveStoredReports(reports);
  return report;
}

export function getAllReports(): UserReport[] {
  return getStoredReports().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getReportsForQuestion(questionId: string): UserReport[] {
  return getStoredReports().filter((r) => r.questionId === questionId);
}

export function getReviewStats(totalQuestions: number): Record<ReviewStatus, number> {
  const reviews = getStoredReviews();
  const counts: Record<ReviewStatus, number> = {
    unreviewed: totalQuestions,
    ai_audited: 0,
    scholar_verified: 0,
    needs_correction: 0,
  };

  for (const review of Object.values(reviews)) {
    if (review.status !== "unreviewed") {
      counts[review.status]++;
      counts.unreviewed--;
    }
  }

  return counts;
}

export function updateReportStatus(
  questionId: string,
  reportDate: string,
  newStatus: "pending" | "reviewed" | "resolved",
) {
  const reports = getStoredReports();
  const report = reports.find(
    (r) => r.questionId === questionId && r.date === reportDate
  );
  if (report) {
    report.status = newStatus;
    saveStoredReports(reports);
  }
}
