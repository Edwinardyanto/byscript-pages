// useProgress — local state progress tracking for lesson completion
// Persists to localStorage so progress survives page refresh

import { useState, useCallback } from "react";

const STORAGE_KEY = "byscript_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // silently fail if storage is unavailable
  }
}

export function useProgress(courseData) {
  const [progress, setProgress] = useState(() => loadProgress());

  const markComplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const next = { ...prev, [lessonId]: true };
      saveProgress(next);
      return next;
    });
  }, []);

  const markIncomplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[lessonId];
      saveProgress(next);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (lessonId) => !!progress[lessonId],
    [progress]
  );

  // Total lessons across all modules
  const allLessons = courseData.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => progress[l.id]).length;
  const overallPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Per-module stats
  const moduleStats = courseData.modules.map((m) => {
    const total = m.lessons.length;
    const completed = m.lessons.filter((l) => progress[l.id]).length;
    return {
      moduleId: m.id,
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  // Next incomplete lesson for "Continue Learning"
  const nextLesson = allLessons.find((l) => !progress[l.id]) || null;

  return {
    progress,
    markComplete,
    markIncomplete,
    isComplete,
    totalLessons,
    completedCount,
    overallPercent,
    moduleStats,
    nextLesson,
  };
}
