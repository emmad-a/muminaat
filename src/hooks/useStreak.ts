"use client";

import { useState, useEffect, useCallback } from "react";
import { StreakData } from "@/types/viral";
import { loadStreak, recordActivity, MILESTONE_MESSAGES } from "@/lib/streak-store";

export function useStreak() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [newMilestone, setNewMilestone] = useState<number | null>(null);

  useEffect(() => {
    setStreak(loadStreak());
  }, []);

  const record = useCallback(() => {
    const result = recordActivity();
    setStreak(result.streak);
    if (result.newMilestone) {
      setNewMilestone(result.newMilestone);
    }
    return result;
  }, []);

  const dismissMilestone = useCallback(() => {
    setNewMilestone(null);
  }, []);

  const milestoneInfo = newMilestone ? MILESTONE_MESSAGES[newMilestone] : null;

  return {
    streak,
    record,
    newMilestone,
    milestoneInfo,
    dismissMilestone,
  };
}
