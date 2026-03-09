// Module page — shows module overview, outcomes, and lesson list

import { ArrowLeft, Clock, Play, CheckCircle, Circle, Target, BookOpen, ChevronRight } from "lucide-react";

export function ModulePage({ module, moduleStats, isComplete, onNavigate }) {
  if (!module) return null;

  return (
    <main className="module-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={() => onNavigate("dashboard")}>
          Course Home
        </button>
        <ChevronRight size={14} className="bc-sep" />
        <span className="breadcrumb-current">{module.id}</span>
      </div>

      {/* Module hero */}
      <section className="module-hero">
        <div className="module-id-pill">{module.id}</div>
        <h1 className="module-title">{module.title}</h1>
        <p className="module-overview">{module.overview}</p>

        <div className="module-meta-row">
          <span className="mod-meta-chip">
            <Clock size={13} /> {module.total_duration}
          </span>
          <span className="mod-meta-chip">
            <BookOpen size={13} /> {module.lessons.length} lessons
          </span>
          <span className="mod-meta-chip">
            <CheckCircle size={13} /> {moduleStats.completed}/{moduleStats.total} done
          </span>
        </div>

        {/* Progress */}
        <div className="module-progress-section">
          <div className="mp-bar-wrap">
            <div className="mp-bar">
              <div className="mp-bar-fill" style={{ width: `${moduleStats.percent}%` }} />
            </div>
            <span className="mp-percent">{moduleStats.percent}%</span>
          </div>
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="module-outcomes">
        <div className="outcomes-header">
          <Target size={16} className="outcomes-icon" />
          <h2>Learning Outcomes</h2>
        </div>
        <div className="outcomes-list">
          {module.learning_outcomes.map((outcome, i) => (
            <div key={i} className="outcome-row">
              <div className="outcome-number">{String(i + 1).padStart(2, "0")}</div>
              <p>{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lessons list */}
      <section className="module-lessons-section">
        <h2 className="lessons-section-title">Lessons</h2>
        <div className="module-lessons-list">
          {module.lessons.map((lesson, idx) => {
            const done = isComplete(lesson.id);
            return (
              <button
                key={lesson.id}
                className={`module-lesson-card ${done ? "mlc--done" : ""}`}
                onClick={() => onNavigate("lesson", lesson.id)}
              >
                <div className="mlc-number">{String(idx + 1).padStart(2, "0")}</div>
                <div className="mlc-icon">
                  {done ? (
                    <CheckCircle size={20} className="mlc-done-icon" />
                  ) : (
                    <div className="mlc-play-btn">
                      <Play size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="mlc-content">
                  <div className="mlc-id">{lesson.id}</div>
                  <div className="mlc-title">{lesson.title}</div>
                  <div className="mlc-summary">{lesson.summary}</div>
                </div>
                <div className="mlc-right">
                  <span className="mlc-duration">{lesson.duration}</span>
                  <ChevronRight size={16} className="mlc-arrow" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
